import Stripe from "stripe";
import {Usuario} from "../entity/usuario";
import {configuration} from "../../config/environment";


class StripeService {
  stripe: Stripe;
  apiKey = configuration.stripeApiKey;
  constructor() {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2020-08-27',
    });
  }

  async createCustomer(email: string) {
    const params: Stripe.CustomerCreateParams = {
      description: 'Customer for CallForMe',
      email
    };
    const stripeUsers = await this.stripe.customers.list();
    const stripeUser = stripeUsers.data.find( su => su.email === email)
    if (stripeUser) {
      return stripeUser.id;
    }
    const customer: Stripe.Customer = await this.stripe.customers.create(params);

    return customer.id;
  };

  getEphemeralKeys(user: Usuario, apiVersion: string) {
    const params: Stripe.EphemeralKeyCreateParams = {
      customer: user.stripe_id
    }
    const requestOptions: Stripe.RequestOptions = {
      apiKey: this.apiKey,
      apiVersion
    }
    return this.stripe.ephemeralKeys.create(params, requestOptions)
  }

  async charge(user: Usuario, currency: any, amount: any, source: any) {
    return this.stripe.charges.create({
      amount, currency, source,
      description: 'Payment',
      customer: user.stripe_id
    })
  }
}

export default new StripeService();
