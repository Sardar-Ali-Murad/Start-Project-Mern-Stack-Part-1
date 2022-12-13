import React from 'react'
import {Link,useLocation} from "react-router-dom"
import { useAppContext } from '../context/appContext'
import Alert from './Alert'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}
const ResetPassword = () => {
    let [value,setValue]=React.useState("")

  let query=useQuery()

  let { VerifyEmail,showAlert,resetPasswordComplete}=useAppContext()

  let token=(query.get("token"))
  const email=(query.get("email"))
  // console.log(query.get("email"))

  React.useEffect(()=>{
      VerifyEmail({email,token})
  },[])

  function submit(){
    resetPasswordComplete({email,token,newPassword:value})
  }

 
  return (
    <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
    {showAlert && <Alert/>}
    <div>

  <input placeholder='NewPassword' onChange={(e)=>setValue(e.target.value)} style={{padding:"4px",width:"300px",height:"40px",outline:"none"}}/>

  <button className='custom__Btn' style={{cursor:"pointer",marginLeft:"20px",padding:"10px"}} onClick={submit}>Submit</button>
  <Link to="/" className='custom__Btn' style={{cursor:"pointer",marginLeft:"20px",padding:"10px",color:"white",textDecoration:"none"}} onClick={submit}>Login</Link>
    </div>
</div>
  )
}

export default ResetPassword
