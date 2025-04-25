import axios from "axios";
import React, { useEffect } from "react";
import qs from "qs"; // install using `npm install qs` if not already installed

export default function ApplePayTest() {
  const createCheckout = async () => {
    const randomMerchantTransactionId = new Date().getTime();

    const data = {
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
    };

    try {
      const res = await axios.post(
        "https://test.oppwa.com/v1/checkouts",
        qs.stringify(data), // Properly url-encode the payload
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer OGFjN2E0Yzg5MzJkYzcwMzAxOTMzZTRkMzM3OTBmZDJ8RlVBaHVtOiUrQTM1R0xmV1FEWnQ=",
          },
        }
      );

      const scriptId = "payment-widget";
      const existingScript = document.getElementById(scriptId);

      if (existingScript) {
        existingScript.remove(); // Ensure it reloads
      }

      window.wpwlOptions = {
        applePay: {
          checkAvailability: "applePayCapabilities",
        },
      };

      const script = document.createElement("script");
      script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${res.data.id}`;
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
          action="https://94cb-2401-4900-5976-9157-d57d-62e-5fb6-2136.ngrok-free.app"
          className="paymentWidgets"
          data-brands="VISA APPLEPAY"
        >
          {/* Payment widget gets embedded here */}
        </form>
      </div>
    </div>
  );
}
