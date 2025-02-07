import { createLazyFileRoute } from '@tanstack/react-router'

import Chat from '@/features/chat/Chat'

export const Route = createLazyFileRoute('/')({
  component: Chat,
})
