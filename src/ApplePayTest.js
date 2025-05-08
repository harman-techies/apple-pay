import axios from "axios";
import React, { useEffect } from "react";
import qs from "qs";

export default function ApplePayTest() {
  const createCheckout = async () => {
    const randomMerchantTransactionId = new Date().getTime();

    const data = {
      entityId: "8acda4cb9619d145019633ad0bfd6a69",
      amount: 2,
      currency: "SAR",
      paymentType: "DB",
      merchantTransactionId: randomMerchantTransactionId,
      "customer.email": "test@gmail.com",
      "customer.givenName": "harmanpreet",
      "customer.surname": "singh",
      "billing.street1": "abc",
      "billing.city": "a",
      "billing.state": "a",
      "billing.country": "SA",
      "billing.postcode": "12345",
    };

    try {
      const res = await axios.post(
        "https://eu-prod.oppwa.com/v1/checkouts",
        qs.stringify(data),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer OGFjOWE0Y2Q5NGQ1YmE1NDAxOTRkNjE0MjIwNzA0YmV8dW9laTVkZ0xBeU1pZE0/RW1acEg=",
          },
        }
      );

      const scriptId = "payment-widget";
      const existingScript = document.getElementById(scriptId);

      if (existingScript) {
        existingScript.remove();
      }

      window.wpwlOptions = {
        applePay: {
          checkAvailability: "applePayCapabilities",
          displayName: "The Kanaa",
          total: { label: "The Kanaa" },
          supportedNetworks: ["masterCard", "visa", "mada"],
          supportedCountries: ["SA"],
        },
      };

      const script = document.createElement("script");
      script.src = `https://eu-prod.oppwa.com/v1/paymentWidgets.js?checkoutId=${res.data.id}`;
      script.id = scriptId;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    } catch (err) {
      console.error("Checkout creation error:", err);
    }
  };

  useEffect(() => {
    createCheckout();
  }, []);

  return (
    <div style={{ padding: "7rem 0" }} className="container">
      <div>
        <form
          action="https://thekanaa.com/hyperpay/index.html"
          className="paymentWidgets"
          data-brands="APPLEPAY"
        ></form>
      </div>
    </div>
  );
}
