const button = document.querySelector("button");

button.addEventListener("click", () => {
  const rzp = new Razorpay({
    // key: "rzp_live_R9PTL1QwwidVgc",
    key: "rzp_test_zwmTLiXv4oRzFL",
    amount: 1000,
    description: "My first test payment.",
    name: "Madlani Labs",
    // currency: "USD",
    image: "http://localhost:5500/procodrr.png",
    theme: {
      color: "#a51e6fff",
    },
    prefill: {
      name: "Gaurav Kumar", //your customer's name
      email: "gaurav.kumar@example.com",
      contact: "+919876543210", //Provide the customer's phone number for better conversion rates
    },
    notes: {
      course: "Node.js",
      amount: 1,
    },
    handler: function (response) {
      console.log(response);
    },
  });

  rzp.on("payment.failed", function (response) {
    console.log(response);
  });

  rzp.open();
});
