import { useTranslation } from "react-i18next";

import PageTitle from "@/components/ui/page-title";
import SignupUser from "./SignupUser";
import PublicPage from "@/components/ui/public-page";
const Signup = () => {
  const { t } = useTranslation();

  return (
    <PublicPage>
      <PageTitle text={t("Signup")} />
      <SignupUser />
    </PublicPage>
  );
};

export default Signup;
