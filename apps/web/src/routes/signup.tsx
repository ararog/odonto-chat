import { createFileRoute } from '@tanstack/react-router'

import Signup from '@/features/signup/Signup'

export const Route = createFileRoute('/signup')({
  component: Signup,
})

