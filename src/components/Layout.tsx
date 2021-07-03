import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "../@types";
import {
  selectActiveTab,
  selectNextTab,
  selectSubscriptionParams,
  submitSubscription,
  selectCeditCardInfo,
  selectEmail,
} from "../store/slice";
import { Navigation } from "./Navigation";
import { PaymentDetails } from "./PaymentDetails";
import { PaymentPlan } from "./PaymentPlan";
import { Summary } from "./Summary";
import { setActiveTab } from "../store/slice";

export const Layout: React.FC = () => {
  const activeTab = useSelector(selectActiveTab);
  const nextTab = useSelector(selectNextTab);
  const subscriptionParams = useSelector(selectSubscriptionParams);
  const ceditCardInfo = useSelector(selectCeditCardInfo);
  const email = useSelector(selectEmail);

  const dispatch = useDispatch();
  const CurrentTab: FC =
    {
      [Tab.PaymentPlan]: PaymentPlan,
      [Tab.PaymentDetails]: PaymentDetails,
      [Tab.Summary]: Summary,
    }[activeTab] || PaymentPlan;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mx-4 p-4">
        <Navigation />
      </div>
      <div className="mt-8 p-4">
        <CurrentTab />
        <div className="flex p-2 mt-4">
          <button
            onClick={() => dispatch(setActiveTab(-1))}
            className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer hover:bg-gray-200 
            bg-gray-100 text-gray-700 border duration-200 ease-in-out border-gray-600 transition"
          >
            Previous
          </button>
          <div className="flex-auto flex flex-row-reverse">
            <button
              disabled={!nextTab}
              onClick={() =>
                activeTab === Tab.Summary
                  ? dispatch(
                      submitSubscription({
                        subscriptionParams,
                        ceditCardInfo,
                        email,
                      })
                    )
                  : dispatch(setActiveTab(+1))
              }
              className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
              hover:bg-blue-600 bg-blue-700 text-gray-100 border duration-400 ease-in-out border-blue-700 transition"
            >
              {activeTab === Tab.Summary ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
