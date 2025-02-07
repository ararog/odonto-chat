import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gql, useMutation } from '@apollo/client';
import { Link, useNavigate } from '@tanstack/react-router';
import {ForgotPasswordForm} from '@/types/forms';
import {ForgotPasswordFormSchema} from '@/validation/forms'
import { useTranslation } from "react-i18next";

import PageTitle from '@/components/ui/page-title';
import FormField from '@/components/ui/form-field';
import PublicPage from '@/components/ui/public-page';
import SubmitButton from '@/components/ui/submit-button';

const FORGOT_PASSWORD = gql`
  mutation VerifyCode($email: String!) {
    forgot(email: $email) {
      ok
    }
  }
`;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { loading, error }] = useMutation<ForgotPasswordForm>(FORGOT_PASSWORD);
  const { t } = useTranslation();

  const methods = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    methods.setFocus('email');
  }, [methods]);
  
  const onSubmit = async (data: ForgotPasswordForm) => {
    const result = await forgotPassword({ variables: data });
    if (result.data) {
      navigate({to: '/login'});
    }
  };

  return (
    <PublicPage>
      <PageTitle text={t("Forgot Password")} />
      <SystemErrors error={error} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-start gap-2'>
            <FormField label={t("Email")} name="email" type="email" />
          </div>

          <SubmitButton disabled={loading} label={loading ? t("Sending Email...") : t("Send Email")} />

          <div className="flex flex-row items-center justify-center mt-5">
            <span>
              {t('Remember your password?')}{' '}
              <Link className="font-bold text-gray-800" to="/login"><span>{t('Login')}</span></Link>
            </span>
          </div>
        </form>
      </FormProvider>
    </PublicPage>
  );
};

export default ForgotPassword;