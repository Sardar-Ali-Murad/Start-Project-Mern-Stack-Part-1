import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Landing,Error,ProtectedRoute,Home,VerifyEmail,InputForgetPassword,ResetPassword} from  "./components/index.js"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/Home" element={
            <ProtectedRoute>
                <Home/>
            </ProtectedRoute>
          }/>
          <Route path="*" element={<Error/>}/>
          <Route path="/api/v1/verifyEmail" element={<VerifyEmail/>}/>
          <Route path="/ForgetPasswordInput" element={<InputForgetPassword/>}/>
          <Route path="/api/v1/resetPassword" element={<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
