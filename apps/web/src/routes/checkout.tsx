import { createFileRoute } from '@tanstack/react-router'

import Checkout from '@/features/checkout/Checkout'

export const Route = createFileRoute('/checkout')({
  component: Checkout,
})
