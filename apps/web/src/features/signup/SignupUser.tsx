import { FormProvider, useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { SignupUserFormSchema } from "@/validation/forms";
import { SignupUserForm } from "@/types/forms";
import { useTranslation } from "react-i18next";

import FormField from "@/components/ui/form-field";
import SubmitButton from '@/components/ui/submit-button';
import { useAuthContext } from '@/security/auth';
import { SystemErrors } from '@/components/ui/system-errors';

const SIGNUP = gql`
  mutation Signup($input: UserCreateInput!) {
    signup(input: $input) {
      id
      name
      email
    }
  }
`;

const SignupUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [signup, { loading, error }] = useMutation(SIGNUP);
  const saveCredentials = useAuthContext(store => store.saveCredentials);

  const methods = useForm<SignupUserForm>({
    resolver: zodResolver(SignupUserFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupUserForm) => {
    const response  = await signup({ 
      variables: { 
        input: {
          name: data.name,
          email: data.email,
          password: data.password
        } 
      } 
    });
    if (response.data) {
      saveCredentials(response.data?.signup, false);
      navigate({ to: "/email/verify" });
    }
  };

  return (
    <div>
      <SystemErrors error={error} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start gap-2">
            <FormField 
              label={t("Name")} 
              name="name" 
              type="text" 
              tabIndex={1}
            />
            <FormField 
              label={t("Email")} 
              name="email" 
              type="email" 
              tabIndex={2}
            />
            <FormField 
              label={t("Password")} 
              name="password" 
              type="password" 
              tabIndex={3}
            />
            <FormField 
              label={t("Confirm Password")} 
              name="confirmPassword" 
              type="password" 
              tabIndex={4}
            />
          </div>
          
          <SubmitButton disabled={loading} label={loading ? t("Signing up...") : t("Signup")} />
          
          <div className="flex flex-row items-center justify-center mt-5">
            <span>
              {t('Already have an account?')}{' '}
              <Link className="font-bold text-gray-800" to="/login">{t('Login')}</Link>
            </span>
          </div>
        </form>
      </FormProvider>
    </div>
  );
  };

export default SignupUser;