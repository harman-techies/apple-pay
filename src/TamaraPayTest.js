import React, { useState, useEffect } from "react";

const TamaraPayTest = () => {
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);

  const redirectBaseURL = "http://localhost:3000/";

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const response = await fetch(
          "https://api-sandbox.tamara.co/checkout/payment-types?country=SA",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJmMGExY2Y1Zi0wMTU2LTRhNTItYWVhNy02ZDdmNmNlZTUzZGYiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOGFkZGJhNzU4NDcyZWMzYThlNWQ0YzBjM2Q0Y2YwYjgiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTc0NTM4ODE5MiwiaXNzIjoiVGFtYXJhIn0.X-6oIqLwhDM5u4r9_8w5pZU6HWOXlpC-vd_wSsZyiKSu0EDX4oPRUkxx7Wm6BZ68POjOynumg9aJSdIK04x8kLYiJY3hLcUPB4H8W_-DWLfH8gdhjO6X4QzTT-bmgtdmcka140m8d5Vdq5457iLRxRnAGAof7jeojoH_JXz-KM8PhmW-cBUM4dYdypBS5XLU3yzTCUJexE-17Circ_DRGcpe0N4wRw7Wj5j1uOCW3-jS2ZWnP3seMEWaCErFz1VwektsHuxLU5GRXAOxwgztAssMzGUpH-tGbFiN7-rRdTHlgf60kSO67Jgbz5p2jGWhLgpqZd5Jk_66Ceu8wG3r8Q",
            },
          }
        );
        const data = await response.json();
        console.log("data", data);
        setPaymentOptions(data);
      } catch (error) {
        console.error("Error fetching payment options:", error);
      }
    };

    fetchPaymentOptions();
  }, []);

  const handlePaymentSelection = async (paymentType) => {
    setSelectedPaymentType(paymentType);
    console.log(`Selected Payment Type: ${paymentType}`);

    const payload = {
      order_reference_id: "853661",
      items: [
        {
          unit_price: {
            amount: 390.43,
            currency: "SAR",
          },
          total_amount: {
            amount: 390.43,
            currency: "SAR",
          },
          tax_amount: {
            amount: 0,
            currency: "SAR",
          },
          discount_amount: {
            amount: 0,
            currency: "SAR",
          },
          sku: "HT-S100F",
          image_url:
            "https://test-media.zid.store/thumbs/88182030-43ec-472c-8b92-62b1960e07e0/e3b21968-f6ce-473a-90e8-ff8ee3926ac4-thumbnail-370x370-70.jpeg",
          type: "digital",
          name: "Sony HT-S100F 2ch Single Soundbar with Bluetooth, easy setup, compact, home office use with clear sound",
          quantity: 1,
          reference_id: "853661",
        },
      ],
      description: "Use Tamara Gateway on mestore",
      tax_amount: {
        amount: 0,
        currency: "SAR",
      },
      merchant_url: {
        success: `${redirectBaseURL}/tamarapaytest.html`,
        notification: `${redirectBaseURL}/tamarapaytest.html`,
        failure: `${redirectBaseURL}/tamarapaytest.html`,
        cancel: `${redirectBaseURL}/tamarapaytest.html`,
      },
      discount: {
        amount: {
          currency: "SAR",
          amount: 0,
        },
        name: "Total Discount",
      },
      shipping_amount: {
        amount: 0,
        currency: "SAR",
      },
      total_amount: {
        amount: 390.43,
        currency: "SAR",
      },
      locale: "en",
      country_code: "SA",
      shipping_address: {
        first_name: "Xohaib",
        last_name: "Qureshi",
        line1: "الرياض",
        postal_code: "12223",
        phone_number: "558771396",
        country_code: "SA",
        city: "Mumbai",
        line2: "الرياض",
        region: "MH",
      },
      consumer: {
        first_name: "Xohaib",
        last_name: "Qureshi",
        date_of_birth: "",
        national_id: "",
        phone_number: "558771396",
        is_first_order: false,
        email: "zohaibwasimq@gmail.com",
      },
      platform: "",
      billing_address: {
        first_name: "Xohaib",
        last_name: "Qureshi",
        line1: "الرياض",
        postal_code: "12223",
        phone_number: "558771396",
        country_code: "SA",
        city: "Mumbai",
        line2: "الرياض",
        region: "MH",
      },
      payment_type: paymentType,
    };

    try {
      const response = await fetch(
        "https://api-sandbox.tamara.co/checkout?country=SA",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiI3MDkxMGQ0MS1mNzRjLTQwMDUtOTk4YS1mNWYyMzYwNTdkZWUiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiMDAzM2YxMmM4NTc4ZjZhYjFiNWI2NzllZGY3ZTljZDYiLCJpYXQiOjE2MzQ2MzUyNTksImlzcyI6IlRhbWFyYSJ9.SzE-QZqs3rcEvECw0KYtKukKF4OwdJ18Por9NqVNwIWe9cE5A6htmlO5D-zh9qlgUzZ7jRuHsJFrsefsj3ZTBd6_mhvG1GsQ3hS7FdDehdi4vlwaHXAMzJJrZNOyQjpUVw_AQsSJnFtCr3M5ATSHSDdtomWOwxAWBPMeqN2NWmz68zsJu1DBEcowxSH1KCEtxcgQUbx4LOiZzRelsgNyXpUs2Q4Q1fd3NK7Zn1GiaX-BuPK-z4iP44K7caPPIeCsJ3kxAv6WHYSmPKpSOuPzV3Dh_rIonVROjyOY7G-U14k2TKAgYJCXv6vGjAAsBahR-edGDU8pxA9fTnsHl81ldA'
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhY2NvdW50SWQiOiJmMGExY2Y1Zi0wMTU2LTRhNTItYWVhNy02ZDdmNmNlZTUzZGYiLCJ0eXBlIjoibWVyY2hhbnQiLCJzYWx0IjoiOGFkZGJhNzU4NDcyZWMzYThlNWQ0YzBjM2Q0Y2YwYjgiLCJyb2xlcyI6WyJST0xFX01FUkNIQU5UIl0sImlhdCI6MTc0NTM4ODE5MiwiaXNzIjoiVGFtYXJhIn0.X-6oIqLwhDM5u4r9_8w5pZU6HWOXlpC-vd_wSsZyiKSu0EDX4oPRUkxx7Wm6BZ68POjOynumg9aJSdIK04x8kLYiJY3hLcUPB4H8W_-DWLfH8gdhjO6X4QzTT-bmgtdmcka140m8d5Vdq5457iLRxRnAGAof7jeojoH_JXz-KM8PhmW-cBUM4dYdypBS5XLU3yzTCUJexE-17Circ_DRGcpe0N4wRw7Wj5j1uOCW3-jS2ZWnP3seMEWaCErFz1VwektsHuxLU5GRXAOxwgztAssMzGUpH-tGbFiN7-rRdTHlgf60kSO67Jgbz5p2jGWhLgpqZd5Jk_66Ceu8wG3r8Q",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log("Payment Request Response:", data);
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        console.error("Checkout URL not found in the response:", data);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div style={{ padding: "7rem 0" }} className="container">
      <h2>Tamara Payment Options</h2>
      {paymentOptions.length > 0 ? (
        <ul>
          {paymentOptions.map((option, index) => (
            <li key={index}>
              <button onClick={() => handlePaymentSelection(option.name)}>
                {option.name} - {option.description}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading payment options...</p>
      )}
      {selectedPaymentType && (
        <p>Selected Payment Type: {selectedPaymentType}</p>
      )}
    </div>
  );
};

export default TamaraPayTest;
