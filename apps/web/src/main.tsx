import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { ApolloProvider } from '@apollo/client';

// Import the generated route tree
import './i18n';
import './index.css'; 
import client from './lib/graphql-client'
import { routeTree } from './routeTree.gen'
import { AuthProvider, useAuthContext } from './security/auth'

// Create a new router instance
const router = createRouter({ 
  routeTree,   
  defaultPreload: 'intent',
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  }, 
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuthContext((state) => state)
  return <RouterProvider router={router} context={{ auth }} />
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </ApolloProvider>
    </StrictMode>,
  )
}