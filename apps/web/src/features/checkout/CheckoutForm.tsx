import { useState } from "react";
import { useTranslation } from "react-i18next";
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';

import SubmitButton from "@/components/ui/submit-button";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();

  const onSubmit = async () => {
    if(! stripe) {
      console.log("Stripe.js hasn't loaded yet.");
      return
    }

    if(! elements) {
      console.log("Stripe elements hasn't loaded yet.");
      return
    }

    setLoading(true);
    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${import.meta.env.BASE_URL}/checkout/success`,
      }
    });
  
    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setLoading(false);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <CardElement />
      <SubmitButton disabled={loading} label={loading ? t("Processing...") : t("Checkout")} />
    </form>
  );
};

export default CheckoutForm;