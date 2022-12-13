import React from 'react'
import {Link,useLocation} from "react-router-dom"
import { useAppContext } from '../context/appContext'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}
const VerifyEmail = () => {

  let query=useQuery()

  let { VerifyEmail}=useAppContext()

  let token=(query.get("token"))
  const email=(query.get("email"))
  // console.log(query.get("email"))

  React.useEffect(()=>{
      VerifyEmail({email,token})
  },[])
 
  return (
    <div>
      <p>You Have Been Vefified Successfully PLease Login Again..</p>
     <Link to="/">
     <button className='custom__Btn'>Login_Page</button>
     </Link> 
    </div>
  )
}

export default VerifyEmail
