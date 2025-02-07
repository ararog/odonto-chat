import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from '@/features/checkout/CheckoutForm';
import Page from '@/components/ui/page';
import PageTitle from '@/components/ui/page-title';

const stripePromise = loadStripe('pk_test_51QpYKn2ctmWlTauTxnjRqQ0olO83NnFsaR6ko283HR1zugSCU6JZh1Jtg6Buo1MOCmtWkgr1Ww7ZclqMw3G9z9mt00PigPyjTA');

const Checkout = () => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Page>
      <PageTitle text='Checkout' />
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </Page>
  );
};

export default Checkout;