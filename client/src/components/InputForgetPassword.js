import React from 'react'
import { useAppContext } from '../context/appContext'
import Alert from "./Alert"

const InputForgetPassword = () => {
    let [value,setValue]=React.useState("")
    let {resetPassword,showAlert}=useAppContext()
      
    function submit(){
        resetPassword({email:value})
    }
  return (
    <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
        {showAlert && <Alert/>}
        <div>

      <input placeholder='Email' onChange={(e)=>setValue(e.target.value)} style={{padding:"4px",width:"300px",height:"40px",outline:"none"}}/>

      <button className='custom__Btn' style={{cursor:"pointer",marginLeft:"20px",padding:"10px"}} onClick={submit}>Submit</button>
        </div>
    </div>
  )
}

export default InputForgetPassword
