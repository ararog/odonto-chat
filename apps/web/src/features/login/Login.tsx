import { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from '@tanstack/react-router';

import { LoginFormSchema } from '@/validation/forms';
import { LoginForm } from '@/types/forms';
import FormField from '@/components/ui/form-field';
import { useAuthContext } from '@/security/auth';
import PublicPage from '@/components/ui/public-page';
import PageTitle from '@/components/ui/page-title';
import SubmitButton from '@/components/ui/submit-button';
import { SystemErrors } from '@/components/ui/system-errors';

const LOGIN = gql`
  mutation Login($input: UserLoginInput) {
    login(input: $input) {
      token
      user {
        id
        emailVerified
        trialEnded
        subscription {
          subscriptionId
          status
        }
      }
    }
  }
`;

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const [login, { loading, error }] = useMutation(LOGIN);
  const saveCredentials = useAuthContext(store => store.saveCredentials);
  
  const methods = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    methods.setFocus('email');
  }, [methods]);

  const onSubmit = async (data: LoginForm) => {
    
    const response = await login({ 
      variables: {
        input: { 
          email: data.email, 
          password: data.password 
        } 
      }
    });

    if (response.data) {
      const { user } = response.data.login;

      if (!user.emailVerified) {
        saveCredentials(
          user, 
          false
        );
        navigate({ to: "/email/verify"});
        return
      }
  
      if (user.trialEnded) {
        saveCredentials(
          user, 
          false
        );
        navigate({ to: "/subscribe"});
        return
      }

      saveCredentials(
        response.data?.login.user, 
        true
      );

      localStorage.setItem('token', response.data.login.token);

      navigate({ to: "/"});
    }
  };

  return (
    <PublicPage>
      <PageTitle text={t("Login")} />
      <SystemErrors error={error} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start gap-2 mt-10 max-md:mt-5 w-96 max-sm:w-80">
            <FormField 
              tabIndex={1}
              label={t("E-mail")} 
              name="email" 
              type="text" 
            />
            <FormField 
              tabIndex={2}
              label={t("Password")} 
              name="password" 
              type="password" 
            />

            <span className="mt-2 h-15">
              {t("Forgot your password?")} {" "}
              <Link className="font-bold text-gray-800" to={"/password/forgot"}>
                {t("Reset")}
              </Link>{" "}
              {t("here")}.
            </span>
            <SubmitButton disabled={loading} label={loading ? t("Logging in...") : t("Login")} />
          </div>
        </form>
      </FormProvider>
      <div className="items-center mt-5 h-15">
        <span>
          {t("Don't have an account?")} {" "}
          <Link className="font-bold text-gray-800" to={"/signup"}>
            {t("Register")}
          </Link>{" "}
          {t("here")}.
        </span>
      </div>
    </PublicPage>
  );
};

export default LoginPage;