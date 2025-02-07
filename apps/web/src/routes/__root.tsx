import { createRootRouteWithContext } from '@tanstack/react-router'

import App from '../App'

import { UserState } from '@/reducers/user'

interface RouterContext {
  auth: UserState
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: App,
})

