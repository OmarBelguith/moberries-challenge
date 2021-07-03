import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  enableNextTab,
  selectEmail,
  selectSubscriptionParams,
  selectTotalPrice,
  setEmail,
} from "../store/slice";

export const Summary: React.FC = () => {
  const dispatch = useDispatch();

  const email = useSelector(selectEmail);
  const totalPrice = useSelector(selectTotalPrice);
  const { volume, duration } = useSelector(selectSubscriptionParams);

  useEffect(() => {
    dispatch(enableNextTab(!!email.length));
  }, [dispatch, email]);

  return (
    <div className="w-full px-4 py-16">
      <h1 className="text-gray-600 text-xl mb-5">Summary of Purchase</h1>
      <div className="w-full max-w-md mx-auto flex flex-col gap-8 items-center bg-white rounded-lg shadow-lg border border-solid border-gray-300 p-4">
        <div>
          <p>Volume: {volume} GB</p>
        </div>
        <div>
          <p>Duration: {duration} Months</p>
        </div>
        <div>
          <p>Amount: {totalPrice} $</p>
        </div>
        <div className="rounded-md shadow-sm w-full">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={({ target: { value } }) => dispatch(setEmail(value))}
              required
              className="appearance-none w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
