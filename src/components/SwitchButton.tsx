import { useDispatch, useSelector } from "react-redux";
import { selectSubscriptionParams, setUpfront } from "../store/slice";

export const SwitchButton: React.FC = () => {
  const { upfrontPayment } = useSelector(selectSubscriptionParams);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center">
      <div
        className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer ${
          upfrontPayment && "bg-green-400"
        }`}
        onClick={() => dispatch(setUpfront(!upfrontPayment))}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
            upfrontPayment && "translate-x-6"
          }`}
        ></div>
      </div>
    </div>
  );
};
