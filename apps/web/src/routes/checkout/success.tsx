import { createFileRoute } from '@tanstack/react-router';

import CheckoutSuccess from '@/features/checkout/CheckoutSuccess';

export const Route = createFileRoute('/checkout/success')({
  component: CheckoutSuccess,
})
