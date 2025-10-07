import express from "express";
import courses from "./courses.json" with { type: "json" };
import checkoutSessions from "./checkout-session.json" with { type: "json" };
import cors from "cors";
import Stripe from "stripe";
import { writeFile } from "fs/promises";

const app = express();
const stripe = new Stripe(
  ""
);
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.json(courses);
});

app.post("/create-checkout-session", async (req, res) => {
  const { id, user } = req.body;
  const course = courses.find((course) => course.id === id);
  const existingSession = checkoutSessions.find(
    ({ courseId, mobile, expire }) =>
      courseId === course.id && mobile === user.mobile && expire > Date.now()
  );
  if (existingSession) {
    if (existingSession.paymentStatus === "unpaid") {
      const session = await stripe.checkout.sessions.retrieve(
        existingSession.sessionId
      );
      return res.json({ url: session.url });
    } else {
      return res.json({ message: "Already purchased" });
    }
  }
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:5173?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:5173",
    line_items: [
      {
        price_data: {
          product_data: {
            name: course.image,
            description: "You can purchase this plan",
            images: [course.image],
          },
          unit_amount: course.price * 100,
          currency: "INR",
        },
        adjustable_quantity: {
          enabled: true,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userName: user.name,
      mobile: user.mobile,
    },
    mode: "payment",
  });

  checkoutSessions.push({
    sessionId: session.id,
    userName: user.name,
    mobile: user.mobile,
    paymentStatus: "unpaid",
    courseId: course.id,
    expire: session.expires_at * 1000,
  });
  await writeFile(
    "./checkout-session.json",
    JSON.stringify(checkoutSessions, null, 2)
  );

  res.json({ url: session.url });
});

app.post("/verify-payment", async (req, res) => {
  const { sessionId } = req.body;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status === "paid") {
    const storedSession = checkoutSessions.find(
      ({ sessionId }) => sessionId === sessionId
    );
    storedSession.paymentStatus = "paid";
    await writeFile(
      "./checkout-session.json",
      JSON.stringify(checkoutSessions, null, 2)
    );
    return res.json({ message: "Payment is successfully" });
  }
  return res.json({ message: "Payment isn't successfully" });
});
app.listen(4000, () => {
  console.log("Server started ");
});
