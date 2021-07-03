import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSubscriptionPlans,
  selectSubscriptionParams,
  setDuration,
  setPrice,
  selectTotalPrice,
  enableNextTab,
} from "../store/slice";
import { Dropdown } from "./Dropdown";
import { SwitchButton } from "./SwitchButton";

export const PaymentPlan: React.FC = () => {
  const dispatch = useDispatch();

  const totalPrice = useSelector(selectTotalPrice);
  const subscriptionPlans = useSelector(selectSubscriptionPlans);
  const { duration, volume } = useSelector(selectSubscriptionParams);

  useEffect(() => {
    dispatch(enableNextTab(true));
  }, [dispatch]);

  return (
    <div className="w-full px-4 py-16">
      <h1 className="text-gray-600 text-xl mb-5">Select Payment</h1>
      <div className="w-full max-w-md mx-auto flex items-center justify-between">
        <h2 className="text-gray-600 text-lg mt-5 mb-5">Duration</h2>
        {subscriptionPlans.map(({ duration_months, price_usd_per_gb }) => (
          <div
            className={`bg-teal-100 relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none hover:bg-gray-300 ${
              duration === duration_months && "bg-gray-300"
            }`}
            onClick={() => {
              dispatch(setPrice(price_usd_per_gb));
              dispatch(setDuration(duration_months));
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className="text-sm">
                  <p
                    className="font-medium text-gray-900 "
                    id="headlessui-label-2"
                  >
                    {duration_months} Months
                  </p>
                  <span
                    className="inline text-gray-500"
                    id="headlessui-description-3"
                  >
                    {price_usd_per_gb}$ / GB
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-md mx-auto flex items-center gap-8 mt-5">
        <h2 className="text-gray-600 text-lg mt-5 mb-5">Amount</h2>
        <Dropdown />
      </div>
      <div className="w-full max-w-md mx-auto flex items-center gap-8 mt-5">
        <h2 className="text-gray-600 text-lg mt-5 mb-5">Upfront Payment</h2>
        <SwitchButton />
      </div>
      <div className="w-full max-w-xs mx-auto flex flex-col px-6 py-2 items-baseline mt-5 text-lg text-gray-800 gap-2 bg-gray-100 rounded-lg border border-solid border-gray-300 shadow-2xl">
        <div className="flex items-center gap-4">
          <p>Volume:</p>
          <p>{volume}GB</p>
        </div>
        <div className="flex items-center gap-4">
          <p>Duration:</p>
          <p>{duration} Months</p>
        </div>
        <div className="flex items-center gap-4">
          <p>Total:</p>
          <p>{totalPrice} $</p>
        </div>
      </div>
    </div>
  );
};
