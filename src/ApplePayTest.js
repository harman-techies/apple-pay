import axios from "axios";
import React, { useEffect } from "react";

export default function ApplePayTest() {
  const createCheckout = async () => {
    let randomMerchantTransactionId = new Date().getTime();

    axios
      .post(
        "https://test.oppwa.com/v1/checkouts",
        {
          entityId: "8ac7a4c996364ef3019638dbb7400181",
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
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer OGFjN2E0Yzg5MzJkYzcwMzAxOTMzZTRkMzM3OTBmZDJ8RlVBaHVtOiUrQTM1R0xmV1FEWnQ=",
          },
        }
      )
      .then((res) => {
        const scriptId = `payment-widget`;
        const existingScript = document.getElementById(scriptId);

        if (!existingScript) {
          // Dynamically load the payment widget script
          const script = document.createElement("script");
          script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${res.data.id}`;
          script.id = scriptId;
          script.crossOrigin = "anonymous";
          script.async = true;
          document.head.appendChild(script);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    createCheckout();
  }, []);

  return (
    <div style={{ padding: "7rem 0" }} className="container">
      <div>
        <form
          action="https://8249-2404-7c80-5d-1f40-dc09-f6d0-47e2-9199.ngrok-free.app"
          className="paymentWidgets"
          data-brands="APPLEPAY"
        />
      </div>
    </div>
  );
}
