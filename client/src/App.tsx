import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router'
import NotFound from './NotFound'
import { main_routes } from './routes/main-routes'
import { AnimatePresence } from 'framer-motion'

function App() {

  const router = createBrowserRouter([
    ...main_routes,
    {
      path: '*',
      element: <NotFound />

    }
  ])
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode='wait'>
        <RouterProvider router={router}/>
      </AnimatePresence>
    </QueryClientProvider>
  )
}

export default App
