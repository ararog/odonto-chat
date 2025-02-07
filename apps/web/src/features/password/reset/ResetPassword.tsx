import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gql, useMutation } from '@apollo/client';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {ResetPasswordForm} from '@/types/forms';
import {ResetPasswordFormSchema} from '@/validation/forms'
import { useTranslation } from "react-i18next";

import PageTitle from '@/components/ui/page-title';
import FormField from '@/components/ui/form-field';
import PublicPage from '@/components/ui/public-page';
import SubmitButton from '@/components/ui/submit-button';

const RESET_PASSWORD = gql`
  mutation Reset($input: ResetPasswordInput) {
    reset(input: $input) {
      ok
    }
  }
`;

const ResetPassword = () => {
  const search = useSearch({ from: '/password/reset' });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [resetPassword, { loading, error }] = useMutation<ResetPasswordForm>(RESET_PASSWORD);

  const methods = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      token: search.token,
      userId: search.userId,
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    methods.setFocus('password');
  }, [methods]);
  
  const onSubmit = async (data: ResetPasswordForm) => {
    const result = await resetPassword({ 
      variables: {
        input: data
      }
    });
    if (result.data) {
      navigate({to: '/login'});
    }
  };

  return (
    <PublicPage>
      <PageTitle text={t("Reset Password")} />
      <SystemErrors error={error} />
      <div className="flex flex-col items-center mt-2 mb-2">
        {error?.clientErrors?.map((error, index) => (
          <span className="text-red-500" key={index}>{t(error.message)}</span>
        ))}        
        {error?.graphQLErrors?.map((error, index) => (
          <span className="text-red-500" key={index}>{t(error.message)}</span>
        ))}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-start gap-2'>
            <FormField 
              label={t("Email")} 
              name="email" 
              type="email" 
              tabIndex={1}
            />
            <FormField 
              label={t("Password")} 
              name="password" 
              type="password" 
              tabIndex={2}
            />
            <FormField 
              label={t("Confirm Password")} 
              name="confirmPassword" 
              type="password" 
              tabIndex={3}
            />
          </div>
          <SubmitButton disabled={loading} label={loading ? t("Resetting Password...") : t("Reset Password")} />
        </form>
      </FormProvider>
    </PublicPage>
  );
};

export default ResetPassword;