import React, { useEffect } from "react";
import axios from "axios";

export default function TapPayment() {
  useEffect(() => {
    loadTapPaymentGateway();
  }, []);

  const loadTapPaymentGateway = () => {
    const { renderTapCard, Theme, Currencies, Direction, Edges, Locale } =
      window.CardSDK;

    renderTapCard("card-sdk-id", {
      publicKey: "pk_test_C8fBZz15JEYR9peFrQitPbmK",
      merchant: {
        id: 65435453,
      },
      transaction: {
        amount: 1,
        currency: Currencies.SAR,
      },
      acceptance: {
        supportedBrands: ["AMERICAN_EXPRESS", "VISA", "MASTERCARD", "MADA"],
        supportedCards: "ALL",
      },
      fields: {
        cardHolder: true,
      },
      addons: {
        displayPaymentBrands: true,
        loader: true,
        saveCard: true,
      },
      interface: {
        locale: Locale.EN,
        theme: Theme.LIGHT,
        edges: Edges.CURVED,
        direction: Direction.LTR,
      },
      onReady: () => {},
      onFocus: () => {},
      onBinIdentification: (data) => {},
      onValidInput: (data) => {},
      onInvalidInput: (data) => {},
      onChangeSaveCardLater: (isSaveCardSelected) => {},
      onError: (data) => {
        console.log("onError", data);
      },
      onSuccess: (data) => {
        console.log("onSuccess", data);
        ChargePayment(data.id);
      },
    });
  };

  const ChargePayment = (token) => {
    const { Currencies } = window.CardSDK;
    const data = {
      amount: 1,
      currency: Currencies.SAR,
      customer_initiated: true,
      threeDSecure: true,
      save_card: false,
      description: "Test Description",
      metadata: { udf1: "Metadata 1" },
      receipt: { email: false, sms: false },
      reference: { transaction: "txn_01", order: "ord_01" },
      customer: {
        first_name: "test",
        middle_name: "test",
        last_name: "test",
        email: "test@test.com",
        phone: { country_code: 966, number: 987654321 },
      },
      merchant: { id: 65435453 },
      source: { id: token },
      post: {
        url: "https://techies-infotech.netlify.app/post_url",
      },
      redirect: {
        url: "https://techies-infotech.netlify.app/redirect_url",
      },
    };

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer sk_test_g9NP3YqdhHJRsZy2Au4letEk",
    };

    axios
      .post("https://api.tap.company/v2/charges/", data, { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error.message);
      });
  };

  return (
    <div>
      <div>
        <div id="card-sdk-id"></div>
        <button id="card-v2" onClick={() => window.CardSDK.tokenize()}>
          Pay Now
        </button>

        <button onClick={() => ChargePayment()}>Create a Charge</button>
      </div>
    </div>
  );
}
