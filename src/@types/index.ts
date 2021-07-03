export interface IPaymentDetails {
  creditCardNumber: string;
  monthExpiryDate: string;
  yearExpiryDate: string;
  cvvCode: string;
}

export interface ISubscriptionParams {
  duration: number;
  price: number;
  volume: number;
  upfrontPayment: boolean;
}

export interface ISubscriptionPlan {
  duration_months: number;
  price_usd_per_gb: number;
}
export interface IRequest {
  status: string;
  error: string | null;
}

export enum Tab {
  PaymentPlan,
  PaymentDetails,
  Summary,
}

export interface ITab {
  active: Tab;
  next: true;
}

export interface IState {
  subscriptionPlans: Array<ISubscriptionPlan>;
  subscriptionParams: ISubscriptionParams;
  ceditCardInfo: IPaymentDetails;
  email: string;
  subscriptionPlansRequest: IRequest;
  subscriptionSubmitRequest: IRequest;
  tabs: ITab;
}

export interface IAppState {
  subscriptions: IState;
}
