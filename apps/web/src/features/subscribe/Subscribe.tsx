import { FormProvider, useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import Page from '@/components/ui/page';
import PageTitle from '@/components/ui/page-title';
import SubmitButton from '@/components/ui/submit-button';
import { SystemErrors } from '@/components/ui/system-errors';
import { SubscriptionForm } from '@/types/forms';
import { SubscriptionFormSchema } from '@/validation/forms';

const SUBSCRIBE = gql`
  mutation Subscribe($input: SubscriptionInput!) {
    subscribe(input: $input) {
      subscriptionId
      clientSecret
    }
  }
`;

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const Subscribe = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [subscribe, { loading, error }] = useMutation(SUBSCRIBE);

  const methods = useForm<SubscriptionForm>({
    resolver: zodResolver(SubscriptionFormSchema),
    defaultValues: {
      userId: "",
    },
  });

  const onSubmit = async (data: SubscriptionForm) => {
    const response  = await subscribe({ 
      variables: { 
        input: {
          userId: data.userId,
        } 
      } 
    });
    if (response.data) {
      navigate({ to: "/checkout" });
    }
  };

  return (
    <Page>
      <PageTitle text='Subscribe' />
      <SystemErrors error={error} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col justify-center gap-2'>
            <span className='text-xl'>{t("Your trial period has ended, you can continue enjoying our product features by subscribing.")}</span>
            <span className='text-sm'>{t("Choose a plan below:")}</span>
            <div className='flex flex-col items-center justify-center gap-5 p-5'>
              <h1 className='text-2xl font-bold'>{t("Unlimited access")}</h1>
              <span className='font-extrabold text-7xl'>R$ 20,00</span>
              <SubmitButton disabled={loading} label={loading ? t("Please wait...") : t("Subscribe")} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Page>
  );
};

export default Subscribe;