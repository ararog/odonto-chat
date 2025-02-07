import { createFileRoute } from '@tanstack/react-router'

import Subscribe from '@/features/subscribe/Subscribe'

export const Route = createFileRoute('/subscribe')({
  component: Subscribe,
})
