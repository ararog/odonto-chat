import { createFileRoute } from '@tanstack/react-router'

import ForgotPassword from '@/features/password/forgot/ForgotPassword'

export const Route = createFileRoute('/password/forgot')({
  component: ForgotPassword,
})
