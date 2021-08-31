import request from "request";
// sk_test_xxxx - Your secret key
const MySecretKey = process.env.PAYSTACK_SECRET_KEY;
export const initializePayment = (form, mycallback) => {
  console.log(form);
  const options = {
    url: "https://api.paystack.co/transaction/initialize",
    headers: {
      authorization: MySecretKey,
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    form,
  };
  const callback = (error, response, body) => {
    return mycallback(error, body);
  };
  request.post(options, callback);

  return initializePayment;
};
export const verifyPayment = (ref, mycallback) => {
  const option = {
    url:
      "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
    headers: {
      authorization: MySecretKey,
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
  };
  const callback = (error, response, body) => {
    return mycallback(error, body);
  };
  request(option, callback);

  return verifyPayment;
};
