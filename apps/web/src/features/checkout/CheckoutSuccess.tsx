import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import PageTitle from '@/components/ui/page-title';
import PublicPage from '@/components/ui/public-page';

const CheckoutSuccess = () => {
  const { t } = useTranslation();
  return (
    <PublicPage>
      <PageTitle text={t("Subscription successful")} />
      <div className='flex flex-col items-center justify-center gap-2 mt-5'>
        <h1 className='text-4xl font-bold'>{t("Subscription successful!")}</h1>
        <p className='text-xl'>{t("Thank you for subscribing!")}</p>
        <p className='text-xl'>{t("You will receive an email confirmation shortly.")}</p>
        <Link to={'/'}>
          <span>{t("Return to home")}</span>
        </Link>
      </div>
    </PublicPage>
  );
};

export default CheckoutSuccess;