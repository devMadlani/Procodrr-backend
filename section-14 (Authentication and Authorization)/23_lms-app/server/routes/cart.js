import express from "express";
import Session from "../models/Session.js";
import Course from "../models/Course.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  console.log(sessionId);
  const session = await Session.findById(sessionId);
  const courseIds = session?.data.cart.map(({ courseId }) => courseId);
  const courses = await Course.find({ _id: { $in: courseIds } });
  const cartCourses = courses.map((course) => {
    const { name, image, price, id } = course;
    const { quantity } = session.data.cart.find(
      ({ courseId }) => courseId === id
    );
    return {
      name,
      image,
      price,
      id,
      quantity,
    };
  });
  res.status(200).json(cartCourses || []);
});

// Add to cart
router.post("/", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  const courseId = req.body.courseId;
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
  console.log(result);
  res.status(201).json({ message: "Course added to cart" });
});

// Remove course from cart
router.delete("/:courseId", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  const courseId = req.params.courseId;
  const result = await Session.updateOne(
    { _id: sessionId },
    { $pull: { "data.cart": { courseId } } }
  );
  console.log(result);
  res.status(200).json({ message: "Course removed from cart" });
});

export default router;
