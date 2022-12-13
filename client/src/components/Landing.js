import React from 'react'
import {useAppContext} from "../context/appContext"
import Alert from './Alert'
import "./Landing.css"
import {useNavigate,Link} from "react-router-dom"

const Landing = () => {

   let {showAlert,isLoading,setupUser,user, loginfun,
      registerfunction}=useAppContext()
    let [register,setRegister]=React.useState(true)
    let [initialObject,setInitialObject]=React.useState({
        name:"",
        password:"",
        email:''
    })

    let navigate=useNavigate()

    React.useEffect(()=>{
        setTimeout(()=>{
         if(user){
            navigate("/Home")
         }
        },3000)
    },[user,navigate])

   //  console.log(showAlert,isLoading,loginUser)

    function handleChange(e){
        setInitialObject((pre)=>{
            return {...pre,[e.target.name]:e.target.value}
        })
    }

    function handlelogin(){
        setRegister(false)
    }


    function handleregister(){
        setRegister(true)
    }

    function registerfun(){
      // registerUser({name:initialObject.name,email:initialObject.email,password:initialObject.password})
      // setupUser({endPoint:"register",alertText:"Register Success!Redirecting",currentUser:initialObject})
      registerfunction({currentUser:initialObject})
   }
   
   
   function login(){
      // loginUser({email:initialObject.email,password:initialObject.password})
      // setupUser({endPoint:"login",alertText:"Login Success!Redirecting...",currentUser:initialObject})
      loginfun({currentUser:initialObject})
    }

   //  console.log(initialObject)
  return (
    <div className='landing__Main section__padding'>
        {
           register?
        
      <div className='landing__Page__Box'>
         <h1 className='h__Cormorant'>Register</h1>

         { showAlert && <Alert/>  }
  
      <div className='box__Layout'>

         <div className='box__divs p__Sans'>
            <p>Name</p>
            <input placeholder='Name' onChange={handleChange} name="name" value={initialObject.name}/>
         </div>


         <div className='box__divs p__Sans'>
            <p>Email</p>
            <input placeholder='Email' onChange={handleChange} name="email" value={initialObject.email}/>
         </div>


         <div className='box__divs p__Sans'>
            <p>Password</p>
            <input placeholder='Password' onChange={handleChange} name="password" value={initialObject.password}/>
         </div>

         <button className='btn' onClick={registerfun} disabled={isLoading}>
            {isLoading?"LOADING":"Submit"}
         </button>

         <p className='p__Cormorant' style={{color:"white",textAlign:"center"}}>Already A Member? <span className='p__Sans' onClick={handlelogin} style={{color:'lightblue',cursor:"pointer"}}>Login</span></p>

         <Link to="/ForgetPasswordInput" style={{color:"white",TextDecoration:"none",marginLeft:"76px",cursor:"pointer"}}>Forget Password?</Link>

      </div>

      </div>
      :
      
      
      
      <div className='landing__Page__Box'>
         <h1 className='h__Cormorant'>Login</h1>

         {showAlert && <Alert/>}
  
      <div className='box__Layout'>

         <div className='box__divs p__Sans'>
            <p>Email</p>
            <input placeholder='Email' onChange={handleChange} name="email" value={initialObject.email}/>
         </div>


         <div className='box__divs p__Sans'>
            <p>Password</p>
            <input placeholder='Password' onChange={handleChange} name="password" value={initialObject.password}/>
         </div>

         <button className='btn' onClick={login} disabled={isLoading}>
            {isLoading?"Loading":'Submit'}
         </button>

         <p className='p__Cormorant' style={{color:"white",textAlign:"center"}}> Not A Member Yet? <span className='p__Sans' onClick={handleregister} style={{color:'lightblue',cursor:"pointer"}}>Register</span></p>
        

      </div>

      </div>
      }
    </div>
  )
}

export default Landing
