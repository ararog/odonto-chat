import { createFileRoute } from '@tanstack/react-router'

import Login from '@/features/login/Login'

export const Route = createFileRoute('/login')({ 
  component: Login,
})

