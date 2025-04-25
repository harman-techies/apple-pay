import React, { useEffect, useRef } from "react";

const ApplePayWidget = () => {
  const formRef = useRef();

  let subTotalAmount = 7731;
  let shippingAmount = 0;
  let taxAmount = 1469;
  const currency = "EUR";
  const applePayTotalLabel = "COMPANY, INC.";

  const getAmount = () =>
    ((subTotalAmount + shippingAmount + taxAmount) / 100).toFixed(2);

  const getTotal = () => ({
    label: applePayTotalLabel,
    amount: getAmount(),
  });

  const getLineItems = () => [
    { label: "Subtotal", amount: (subTotalAmount / 100).toFixed(2) },
    { label: "Shipping", amount: (shippingAmount / 100).toFixed(2) },
    { label: "Tax", amount: (taxAmount / 100).toFixed(2) },
  ];

  useEffect(() => {
    window.wpwlOptions = {
      applePay: {
        version: 3,
        checkAvailability: "applePayCapabilities",
        merchantIdentifier: "merchant.com.test",
        buttonSource: "js",
        buttonStyle: "white-outline",
        buttonType: "buy",
        displayName: "MyStore",
        total: getTotal(),
        currencyCode: currency,
        countryCode: "US",
        merchantCapabilities: ["supports3DS"],
        supportedNetworks: ["amex", "discover", "masterCard", "visa"],
        lineItems: getLineItems(),
        shippingMethods: [
          {
            label: "Free Shipping",
            amount: "0.00",
            identifier: "free",
            detail: "Delivers in five business days",
          },
          {
            label: "Express Shipping",
            amount: "5.00",
            identifier: "express",
            detail: "Delivers in two business days",
          },
        ],
        shippingType: "shipping",
        supportedCountries: ["US"],
        requiredShippingContactFields: ["postalAddress", "email"],
        requiredBillingContactFields: ["postalAddress"],
        onCancel: () => {
          console.log("onCancel");
        },
        onPaymentMethodSelected: (paymentMethod) => {
          console.log("onPaymentMethodSelected: " + paymentMethod.type);
          subTotalAmount = ["debit", "credit"].includes(paymentMethod.type)
            ? 7731
            : 7431;
          return {
            newTotal: getTotal(),
            newLineItems: getLineItems(),
          };
        },
        onShippingContactSelected: (shippingContact) => {
          console.log("onShippingContactSelected: ", shippingContact);
          taxAmount = shippingContact.administrativeArea === "FL" ? 1269 : 1469;

          const update = {
            newTotal: getTotal(),
            newLineItems: getLineItems(),
          };

          if (shippingContact.postalCode === "95014") {
            update.errors = [
              {
                code: "shippingContactInvalid",
                contactField: "postalCode",
                message: "ZIP Code is invalid",
              },
            ];
          }

          return update;
        },
        onShippingMethodSelected: (shippingMethod) => {
          console.log("onShippingMethodSelected: ", shippingMethod);
          shippingAmount = shippingMethod.identifier === "free" ? 0 : 500;
          return {
            newTotal: getTotal(),
            newLineItems: getLineItems(),
          };
        },
        onPaymentAuthorized: (payment) => {
          console.log("onPaymentAuthorized payment: ", payment);
          // Perform server validation here if needed
          return { status: "SUCCESS" };
        },
      },
    };

    // Dynamically load HyperPay script
    const script = document.createElement("script");
    script.src =
      "https://oppwa.com/v1/paymentWidgets.js?checkoutId=yourCheckoutId";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <form
      ref={formRef}
      action="https://hyperpay.docs.oppwa.com/integrations/widget"
      className="paymentWidgets"
      data-brands="APPLEPAY"
    ></form>
  );
};

export default ApplePayWidget;
