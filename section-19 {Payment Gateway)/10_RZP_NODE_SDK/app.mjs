import Razorpay from "razorpay";

const rzpInstance = new Razorpay({
  key_id: "rzp_test_RHMd8EwlqGpCC0",
  key_secret: "jdcig0FMgwcTALUVWOd3DNew",
});

const data = await rzpInstance.payments.all({}); // to fetch all payments
// const data = await rzpInstance.payments.fetch('payment_id') // to fetch individual payment

// const data = await rzpInstance.payments.all({}); // to fetch all orders
// const data = await rzpInstance.orders.fetch("order_id"); //to fetch individual order

console.log(data);
