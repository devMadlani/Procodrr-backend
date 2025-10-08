import express from "express";
import courses from "./courses.json" with { type: "json" };
import checkoutSessions from "./checkout-session.json" with { type: "json" };
import cors from "cors";
import Stripe from "stripe";
import { writeFile } from "fs/promises";

const stripe = new Stripe(
  ""
);

const endpointSecret = "";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    console.log(req.headers);
    let event;
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }

    const checkoutSession = event.data.object;
    // console.log(event);
    // console.log(checkoutSession);

    // console.log(req.headers);

    if (checkoutSession.payment_status === "paid") {
      const storedCheckoutSession = checkoutSessions.find(
        ({ sessionId }) => sessionId === checkoutSession.id
      );

      storedCheckoutSession.paymentStatus = "paid";
      storedCheckoutSession.updatedByWebhook = true;
      await writeFile(
        "./checkout-session.json",
        JSON.stringify(checkoutSessions, null, 2)
      );
    }

    res.sendStatus(400);
  }
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json(courses);
});

app.post("/create-checkout-session", async (req, res) => {
  const courseId = req.body.id;
  const course = courses.find(({ id }) => id === courseId);
  const existingCheckoutSession = checkoutSessions.find(
    ({ userMobile, courseId }) =>
      req.body.user.mobile === userMobile && req.body.id === courseId
  );

  if (existingCheckoutSession) {
    if (existingCheckoutSession.paymentStatus === "unpaid") {
      // stripe.checkout.sessions.retrieve(existingCheckoutSession.sessionId)
      return res.json({ checkoutUrl: existingCheckoutSession.url });
    } else {
      return res.json({ message: "You have already purchased this course." });
    }
  }

  const newCheckoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: "http://localhost:5173?session_id={CHECKOUT_SESSION_ID}",
    // cancel_url: "http://procodrr.com",
    line_items: [
      {
        price_data: {
          product_data: {
            name: course.name,
            images: [course.image],
            description: `Best ${course.name}`,
          },
          unit_amount: course.price * 100,
          currency: "inr",
        },
        quantity: 1,
      },
    ],
    metadata: {
      userName: req.body.user.name,
      userMobile: req.body.user.mobile,
      courseId,
    },
  });

  checkoutSessions.push({
    sessionId: newCheckoutSession.id,
    userName: req.body.user.name,
    userMobile: req.body.user.mobile,
    paymentStatus: "unpaid",
    url: newCheckoutSession.url,
    courseId,
  });

  await writeFile(
    "./checkout-session.json",
    JSON.stringify(checkoutSessions, null, 2)
  );

  res.json({ checkoutUrl: newCheckoutSession.url });
});

app.post("/verify-payment", async (req, res) => {
  const checkoutSession = await stripe.checkout.sessions.retrieve(
    req.body.sessionId
  );

  if (checkoutSession.payment_status === "paid") {
    const storedCheckoutSession = checkoutSessions.find(
      ({ sessionId }) => sessionId === req.body.sessionId
    );

    storedCheckoutSession.paymentStatus = "paid";
    storedCheckoutSession.updatedByFrontend = true;
    await writeFile(
      "./checkout-session.json",
      JSON.stringify(checkoutSessions, null, 2)
    );
    return res.json({ message: "Payment is successful", status: "success" });
  }

  return res.json({ message: "Payment is not successful", status: "failed" });
});

app.listen(4000, () => {
  console.log("Server started");
});
