import React, { useEffect } from "react";

export default function TapPayment() {
  useEffect(() => {
    loadTapPaymentGateway();
  }, []);

  const loadTapPaymentGateway = () => {
    const {
      renderTapCard,
      Theme,
      Currencies,
      Direction,
      Edges,
      Locale,
      tokenize,
      resetCardInputs,
      saveCard,
      updateCardConfiguration,
      updateTheme,
      loadSavedCard,
    } = window.CardSDK;

    renderTapCard("card-sdk-id", {
      publicKey: "pk_test_C8fBZz15JEYR9peFrQitPbmK",
      merchant: {
        id: "65435453",
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
      onReady: () => console.log("onReady"),
      onFocus: () => console.log("onFocus"),
      onBinIdentification: (data) => console.log("onBinIdentification", data),
      onValidInput: (data) => console.log("onValidInputChange", data),
      onInvalidInput: (data) => console.log("onInvalidInput", data),
      onChangeSaveCardLater: (isSaveCardSelected) =>
        console.log(isSaveCardSelected, " :onChangeSaveCardLater"), // isSaveCardSelected:boolean
      onError: (data) => console.log("onError", data),
      onSuccess: (data) => console.log("onSuccess", data),
    });
  };

  return (
    <div>
      <div>
        <div id="card-sdk-id"></div>
        <button id="card-v2" onclick="window.CardSDK.tokenize()">
          Pay Now
        </button>
      </div>
    </div>
  );
}
