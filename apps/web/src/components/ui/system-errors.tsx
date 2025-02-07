import { ApolloError } from "@apollo/client";
import { useTranslation } from "react-i18next";

type SystemErrorsProps = {
  error?: ApolloError
}

export const SystemErrors = ({ error }: SystemErrorsProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center mt-2 mb-2">
      {error?.graphQLErrors?.map((error, index) => (
        <span className="text-red-500" key={index}>{t(error.message)}</span>
      ))}
    </div>
  );
};
