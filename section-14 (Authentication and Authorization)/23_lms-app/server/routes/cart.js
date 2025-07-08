import express from "express";
import Session from "../models/Session.js";
import Course from "../models/Course.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  const session = await Session.findById(sessionId).populate(
    "data.cart.courseId"
  );
  if (!session.userId) {
    const cartCourses = session.data.cart.map(({ courseId, quantity }) => {
      const { id, name, image, price } = courseId;
      return {
        id,
        name,
        image,
        price,
        quantity,
      };
    });

    return res.status(200).json(cartCourses || []);
  }

  const data = await Cart.findOne({ userId: session.userId }).populate(
    "courses.courseId"
  );
  const cartCourses = data.courses.map(({ courseId, quantity }) => {
    const { id, name, image, price } = courseId;
    return {
      id,
      name,
      image,
      price,
      quantity,
    };
  });

  return res.status(200).json(cartCourses || []);
});

// Add to cart
router.post("/", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  const courseId = req.body.courseId;

  const session = await Session.findById(sessionId);
  if (session.userId) {
    const result = await Cart.updateOne(
      {
        userId: session.userId,
        "courses.courseId": courseId,
      },
      { $inc: { "courses.$.quantity": 1 } }
    );
    console.log(result);
    if (result.matchedCount === 0) {
      const a = await Cart.updateOne(
        { userId: session.userId },
        { $push: { courses: { courseId, quantity: 1 } } }
      );
      console.log(a);
    }
    return res.status(201).json({ message: "Course added to cart" });
  }
  const result = await Session.updateOne(
    {
      _id: sessionId,
      "data.cart.courseId": courseId,
    },
    { $inc: { "data.cart.$.quantity": 1 } }
  );
  if (result.matchedCount === 0) {
    await Session.updateOne(
      { _id: sessionId },
      { $push: { "data.cart": { courseId, quantity: 1 } } }
    );
  }
  res.status(201).json({ message: "Course added to cart" });
});

// Remove course from cart
router.delete("/:courseId", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  const courseId = req.params.courseId;
  const session = await Session.findById(sessionId);
  if (session.userId) {
    await Cart.updateOne(
      { userId: session.userId },
      { $pull: { courses: { courseId } } }
    );
  } else {
    await Session.updateOne(
      { _id: sessionId },
      { $pull: { "data.cart": { courseId } } }
    );
  }
  res.status(200).json({ message: "Course removed from cart" });
});

export default router;
