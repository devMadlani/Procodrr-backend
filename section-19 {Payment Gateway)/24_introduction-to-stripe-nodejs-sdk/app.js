import Stripe from "stripe";
const stripe = new Stripe("");

// const { data } = await stripe.checkout.sessions.list({
//   limit: 100,
// });

// console.log(data);
// console.log(data.length);

// const checkoutSession = await stripe.checkout.sessions.retrieve(
//   "cs_test_b1d7LNouA60ixuIlNmAeEpcWL07xkHI5vlJgRhaK6IxUFzVMejIJ5OGHmv"
// );

// console.log(checkoutSession);

// const allCharges = await stripe.charges.list()
// console.log(allCharges);

// const charge = await stripe.charges.retrieve('py_3S6G5JQejmbJMlIq1lx8olFW')
// console.log(charge);

const charge = await stripe.charges.list({
  payment_intent: "pi_3S7FhoQejmbJMlIq1pY9Kx2H",
});
console.log(charge);
