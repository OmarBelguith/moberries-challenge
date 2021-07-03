import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestForger } from "../helpers";
import axios from "axios";
import { IAppState, IState, Tab } from "../@types";

const initial: IState = {
  subscriptionPlans: [
    { duration_months: 3, price_usd_per_gb: 3 },
    { duration_months: 6, price_usd_per_gb: 2.5 },
    { duration_months: 12, price_usd_per_gb: 2 },
  ],
  subscriptionParams: {
    duration: 12,
    price: 2,
    volume: 5,
    upfrontPayment: false,
  },
  ceditCardInfo: {
    creditCardNumber: "",
    monthExpiryDate: "",
    yearExpiryDate: "",
    cvvCode: "",
  },
  email: "",
  subscriptionPlansRequest: {
    status: "",
    error: "",
  },
  tabs: {
    active: Tab.PaymentPlan,
    next: true,
  },
  subscriptionSubmitRequest: {
    status: "",
    error: null,
  },
};
export const fetchPrices = createAsyncThunk(
  "fetchPrices",
  async (_: void, { rejectWithValue }): Promise<any> => {
    try {
      const data = await requestForger(axios.get, [
        "https://cloud-storage-prices-moberries.herokuapp.com/prices",
      ]);
      return data.subscription_plans;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const submitSubscription = createAsyncThunk(
  "submitSubscription",
  async (form: any, { rejectWithValue }) => {
    try {
      const data = await requestForger(axios.post, [
        "https://httpbin.org/post",
        form,
      ]);
      process.env.NODE_ENV === "development" &&
        console.log("object", data.subscription_plans);
      return data;
    } catch (e) {
      process?.env?.NODE_ENV === "development" && console.log(e);
      return rejectWithValue(e);
    }
  }
);

export const subscriptionPlansSclice = createSlice({
  name: "subscriptions",
  initialState: initial,
  reducers: {
    setSubscriptionsPlan: (state, { payload }) => {
      state.subscriptionPlans = payload;
    },
    setSubscriptionsPlanLoading: (state, { payload }) => {
      state.subscriptionPlansRequest.status = payload;
    },
    setSubscriptionsPlanError: (state, { payload }) => {
      state.subscriptionPlansRequest.error = payload;
    },
    setDuration: (state, { payload }) => {
      state.subscriptionParams.duration = payload;
    },
    setPrice: (state, { payload }) => {
      state.subscriptionParams.price = payload;
    },
    setVolume: (state, { payload }) => {
      state.subscriptionParams.volume = payload;
    },
    setUpfront: (state, { payload }) => {
      state.subscriptionParams.upfrontPayment = payload;
    },
    setCard: (state, { payload }) => {
      state.ceditCardInfo = payload;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setActiveTab: (state, { payload }) => {
      let nextTab = payload + state.tabs.active;
      if (nextTab > Tab.Summary || nextTab <= Tab.PaymentPlan) {
        nextTab = Tab.PaymentPlan;
      }
      state.tabs.active = nextTab;
    },
    enableNextTab: (state, { payload }) => {
      state.tabs.next = payload;
    },
    resetState: (state) => {
      state = { ...initial };
    },
  },
  extraReducers: {
    [fetchPrices.pending.toString()]: (state: IState): IState => {
      return {
        ...state,
        subscriptionPlansRequest: {
          ...state.subscriptionPlansRequest,
          status: "loading",
        },
      };
    },
    [fetchPrices.fulfilled.toString()]: (
      state: IState,
      { payload }
    ): IState => {
      return {
        ...state,
        subscriptionPlans: payload,
        subscriptionPlansRequest: {
          status: "fulfilled",
          error: null,
        },
      };
    },
    [fetchPrices.rejected.toString()]: (state: IState, { payload }): IState => {
      return {
        ...state,
        subscriptionPlansRequest: {
          status: "error",
          error: payload,
        },
      };
    },
    [submitSubscription.pending.toString()]: function (state: IState): IState {
      return {
        ...state,
        subscriptionSubmitRequest: {
          ...state.subscriptionSubmitRequest,
          status: "loading",
        },
      };
    },
    [submitSubscription.fulfilled.toString()]: function (
      state: IState
    ): IState {
      return {
        ...state,
        subscriptionSubmitRequest: {
          status: "idle",
          error: null,
        },
      };
    },
    [submitSubscription.rejected.toString()]: function (
      state: IState,
      { payload }
    ): IState {
      return {
        ...state,
        subscriptionSubmitRequest: {
          status: "error",
          error: payload.error,
        },
      };
    },
  },
});
export const {
  setSubscriptionsPlanLoading: setLoading,
  setSubscriptionsPlanError: setError,
  setSubscriptionsPlan,
  setVolume,
  setDuration,
  setUpfront,
  setCard,
  setEmail,
  setPrice,
  setActiveTab,
  enableNextTab,
  resetState,
} = subscriptionPlansSclice.actions;

export const selectActiveTab = (state: IAppState) =>
  state.subscriptions.tabs.active;

export const selectSubscriptionPlans = (state: IAppState) =>
  state.subscriptions.subscriptionPlans;

export const selectSubscriptionParams = (state: IAppState) =>
  state.subscriptions.subscriptionParams;

export const selectNextTab = (state: IAppState) =>
  state.subscriptions.tabs.next;

export const selectCeditCardInfo = (state: IAppState) =>
  state.subscriptions.ceditCardInfo;

export const selectEmail = (state: IAppState) => state.subscriptions.email;

export const selectTotalPrice = (state: IAppState) => {
  const { upfrontPayment, price, volume } = selectSubscriptionParams(state);
  return price * volume * (upfrontPayment ? 0.9 : 1);
};

export default subscriptionPlansSclice.reducer;
