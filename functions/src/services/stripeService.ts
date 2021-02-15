import Stripe from "stripe";

const stripeKey = 'sk_live_cWuH7FHD6CR1sCWgZGc1koyt';

class StripeService {
  stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(stripeKey, {
      apiVersion: '2020-08-27',
    });
  }

  async createCustomer(email: string) {
    const params: Stripe.CustomerCreateParams = {
      description: 'Customer for CallForMe',
      email
    };

    const customer: Stripe.Customer = await this.stripe.customers.create(params);

    return customer.id;
  };
}

export default new StripeService();
