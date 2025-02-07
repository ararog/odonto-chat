import { useEffect } from "react";
import { gql, useMutation } from '@apollo/client';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useUserStore } from "@/reducers/user";
import {VerificationForm} from '@/types/forms';
import {VerifyEmailFormSchema} from '@/validation/forms';
import PageTitle from "@/components/ui/page-title";
import FormField from "@/components/ui/form-field";
import SubmitButton from "@/components/ui/submit-button";
import PublicPage from "@/components/ui/public-page";
import { SystemErrors } from "@/components/ui/system-errors";

const VERIFY_CODE = gql`
  mutation VerifyCode($input: VerifyEmailInput!) {
    verify(input: $input) {
      ok
    }
  }
`;

const Verify = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [verifyCode, { loading, error }] = useMutation<VerificationForm>(VERIFY_CODE);
  const user = useUserStore(store => store.user);

  const methods = useForm<VerificationForm>({
    resolver: zodResolver(VerifyEmailFormSchema),
    defaultValues: {
      userId: user?.id,
      token: '',
    },
  });

  useEffect(() => {
    methods.setFocus('token');
  }, [methods]);

  const onSubmit = async (data: VerificationForm) => {
    const response = await verifyCode({
      variables: {
        input: data
      }
    });
    if (response.data) {
      navigate({to: '/login'});
    }
  };
    
  return (
    <PublicPage>
      <PageTitle text={t("E-mail Verification")} />
      <SystemErrors error={error} />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='flex flex-col items-start'>
            <FormField label={t("Code")} name="token" type="text" />
          </div>
          <SubmitButton disabled={loading} label={loading ? t("Verifying...") : t("Verify")} />
        </form>
      </FormProvider>
      <div className="items-center mt-5 h-15">
        <span>
          {t("Already verified your e-mail?")} {" "}
          <Link className="font-bold text-gray-800" to={"/login"}>
            {t("Login")}
          </Link>.
        </span>
      </div>      
    </PublicPage>
  );
};

export default Verify;