import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPaymentDetails } from "../@types";
import { creditCardValidator, cvvCodeValidator } from "../helpers";
import { enableNextTab, selectTotalPrice, setCard } from "../store/slice";

export const PaymentDetails: React.FC = () => {
  const dispatch = useDispatch();
  const totalPrice = useSelector(selectTotalPrice);

  const [data, setData] = useState<IPaymentDetails>({
    creditCardNumber: "",
    monthExpiryDate: "01",
    yearExpiryDate: "2021",
    cvvCode: "",
  });

  useEffect(() => {
    if (Object.values(data).every(Boolean)) {
      dispatch(setCard(data));
      dispatch(enableNextTab(true));
    } else {
      dispatch(enableNextTab(false));
    }
  }, [data, dispatch]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [event.target.name]: event.target.value.trim(),
    });
  };
  return (
    <div className="w-full px-4 py-16">
      <h1 className="text-2xl text-gray-700 mb-5">Payment Details</h1>
      <div className="p-10 rounded-md shadow-md bg-white">
        <div className="mb-3">
          <label className="font-bold text-sm mb-2 ml-1">Card number</label>
          <div>
            <input
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="0000 0000 0000 0000"
              type="text"
              value={data.creditCardNumber}
              name="creditCardNumber"
              onChange={(event) =>
                creditCardValidator(event.target.value) || handleChange(event)
              }
            />
          </div>
        </div>
        <div className="mb-3 -mx-2 flex items-end">
          <div className="px-2 w-1/2">
            <label className="font-bold text-sm mb-2 ml-1">
              Expiration date
            </label>
            <div>
              <select
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                onChange={handleChange}
                name="monthExpiryDate"
                value={data.monthExpiryDate}
              >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
          </div>
          <div className="px-2 w-1/2">
            <select
              className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              onChange={handleChange}
              name="yearExpiryDate"
              value={data.yearExpiryDate}
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
            </select>
          </div>
        </div>
        <div className="mb-10">
          <label className="font-bold text-sm mb-2 ml-1">CVV</label>
          <div>
            <input
              className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="000"
              type="text"
              value={data.cvvCode}
              name="cvvCode"
              onChange={(event) =>
                cvvCodeValidator(event.target.value) || handleChange(event)
              }
            />
          </div>
        </div>
        <div className="mb-6 text-right">
          <span className="text-right font-bold">Total: {totalPrice} USD</span>
        </div>
      </div>
    </div>
  );
};
