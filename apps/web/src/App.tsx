import { Outlet } from '@tanstack/react-router'

function App() {

  return (
    <div className='flex flex-col w-full'>
      <Outlet />
    </div>
  )
}

export default App
