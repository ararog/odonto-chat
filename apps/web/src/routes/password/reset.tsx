import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';

import ResetPassword from '@/features/password/reset/ResetPassword'

const searchSchema = z.object({
  userId: z.number(),
  token: z.string().min(8).max(8),
})


export const Route = createFileRoute('/password/reset')({
  component: ResetPassword,
  validateSearch: searchSchema,
})
