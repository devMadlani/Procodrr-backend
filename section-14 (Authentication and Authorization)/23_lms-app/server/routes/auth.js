import express from "express";
import User from "../models/User.js";
import Session from "../models/Session.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      email,
      password,
      name,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const sessionId = req.signedCookies.sid;
    let session = await Session.findById(sessionId);

    if (session) {
      session.expires = Math.round(Date.now() / 1000) + 60 * 60 * 24 * 30;
      session.userId = user._id;
      const cart = await Cart.findOne({ userId: user._id });
      if (cart) {
        const cartCourse = [...cart.courses];
        for (const course of session.data.cart) {
          const existingCourse = cartCourse.find(
            (c) => c.courseId?.toString() === course.courseId.toString()
          );
          if (existingCourse) {
            existingCourse.quantity += course.quantity || 1;
          } else {
            cartCourse.push({ ...course, quantity: course.quantity || 1 });
          }
        }
        cart.courses = cartCourse;
        await cart.save();
      } else {
        await Cart.create({ userId: user._id, courses: session.data.cart });
      }
      session.data = {};
      await session.save();
      res.cookie("sid", session.id, {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 60 * 1000 * 24 * 30,
      });

      return res.json({
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    }

    const newSession = await Session.create({ userId: user._id });

    res.cookie("sid", newSession.id, {
      httpOnly: true,
      signed: true,
      maxAge: 60 * 60 * 1000 * 24 * 30,
    });

    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  await Session.findByIdAndDelete(sessionId);
  res.status(200).json({ message: "Logged out successfully" });
});
router.get("/profile", async (req, res) => {
  try {
    const sessionId = req.signedCookies.sid;
    const session = await Session.findById(sessionId);

    if (!session || !session.userId) {
      return res.status(401).json({ message: "User not logged in" });
    }
    if (session.expires < Math.round(Date.now() / 1000)) {
      session.deleteOne();
      return res.status(401).json({ message: "User not logged in" });
    }
    const user = await User.findById(session.userId).lean();

    return res.json({
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
