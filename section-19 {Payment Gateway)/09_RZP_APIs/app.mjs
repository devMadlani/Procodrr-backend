const authToken = btoa("rzp_test_RHMd8EwlqGpCC0:jdcig0FMgwcTALUVWOd3DNew");

const response = await fetch("https:/api.razorpay.com/v1/payments?count=4", {
  headers: {
    Authorization: `Basic ${authToken}`,
  },
});
const data = await response.json();
console.log(data);
