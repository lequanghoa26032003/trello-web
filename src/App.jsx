import { Routes, Route, Navigate } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
// import Boards from '~/pages/Boards'

import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to='/boards/6716070c2349351537af7b6b' replace={true} />
      } />

      <Route path='/boards/:boardId' element={<Board/>} />
      {/* <Route path='/boards' element={<Boards/>} /> */}

      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth/>} />
      <Route path='/account/verification' element={<AccountVerification/>} />


      <Route path='*' element={<NotFound/>} />

    </Routes>
  )
}

export default App
