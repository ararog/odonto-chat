import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'api_key_placeholder');

export const POST = async (req: NextRequest) => {

  // Retrieve the event by verifying the signature using the raw body and secret.
  let event;

  const body = await req.json()

  try {
    event = stripe.webhooks.constructEvent(
      body,
      req.headers.get('stripe-signature') as string,
      process.env.STRIPE_SECRET_KEY as string
    );
  } catch (err) {
    console.log(err);
    console.log(`⚠️  Webhook signature verification failed.`);
    console.log(
      `⚠️  Check the env file and enter the correct webhook secret.`
    );
    return new NextResponse(null, {
      status: 400,
    });
  }
  // Extract the object from the event.
  const dataObject = event.data.object;

  // Handle the event
  // Review important events for Billing webhooks
  // https://stripe.com/docs/billing/webhooks
  // Remove comment to see the various objects sent for this sample
  switch (event.type) {
    case 'invoice.paid':
      // Used to provision services after the trial has ended.
      // The status of the invoice will show up as paid. Store the status in your
      // database to reference when a user accesses your service to avoid hitting rate limits.
      break;
    case 'invoice.payment_failed':
      // If the payment fails or the customer does not have a valid payment method,
      //  an invoice.payment_failed event is sent, the subscription becomes past_due.
      // Use this webhook to notify your user that their payment has
      // failed and to retrieve new card details.
      break;
    case 'customer.subscription.deleted':
      if (event.request != null) {
        // handle a subscription canceled by your request
        // from above.
      } else {
        // handle subscription canceled automatically based
        // upon your subscription settings.
      }
      break;
    default:
    // Unexpected event type
  }

  return new NextResponse(null, {
    status: 200,
  });
}