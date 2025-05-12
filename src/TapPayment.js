import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TapPayment() {
  const [tapResponse, sstTapResponse] = useState({});

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

  useEffect(() => {
    loadTapPaymentGateway();
  }, []);

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

    axios
      .post("https://applepay-server-1r7f.onrender.com/api/charge", data)
      .then((res) => window.location.replace(res.data.transaction.url))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Extract tap_id from query params
    const tapIdParam = urlParams.get("tap_id");
    getPaymentStatus(tapIdParam);
  }, []);

  const getPaymentStatus = (id) => {
    axios
      .get(`https://applepay-server-1r7f.onrender.com/api/charge/${id}`)
      .then((res) => {
        sstTapResponse(res.data.response);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>
        <div id="card-sdk-id"></div>
        <button id="card-v2" onClick={() => window.CardSDK.tokenize()}>
          Pay Now
        </button>
      </div>
      {tapResponse?.code != undefined && (
        <div style={{ padding: "1rem" }}>
          <div>Code : {tapResponse?.code || ""}</div>
          <div>Message : {tapResponse?.message || ""}</div>
        </div>
      )}
    </div>
  );
}
