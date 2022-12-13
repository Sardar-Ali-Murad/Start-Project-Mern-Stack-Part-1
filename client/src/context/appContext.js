import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPLOAD_IMAGE,
  HANDLE_CHANGE,
  CLEAR_UPLOADS,
  CHANGE_PAGE,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,LOGIN_USER_SUCCESS,
  RESETPASSWORD_ERROR,
  RESETPASSWORD_SUCCESS,
  RESETPASSWORDCOMPLETE_ERROR,
  RESETPASSWORDCOMPLETE_SUCCESS
 
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  image:"",
  totalPages:1,
  page:1
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  
  }

  // const setupUser = async ({ currentUser, endPoint, alertText }) => {
  //   dispatch({ type: SETUP_USER_BEGIN })
  //   try {
  //     const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

  //     const { user, token } = data
  //     dispatch({
  //       type: SETUP_USER_SUCCESS,
  //       payload: { user, token, alertText },
  //     })
  //     addUserToLocalStorage({ user, token })
  //   } catch (error) {
  //     dispatch({
  //       type: SETUP_USER_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     })
  //   }
  //   clearAlert()
  // }

  
  const registerfunction = async ({ currentUser}) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/register`, currentUser)

      // const { user, token } = data
      dispatch({
        type: REGISTER_USER_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }


  const loginfun = async ({ currentUser}) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/login`, currentUser)

      const { user, token } = data
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload:{ user, token}
      })

      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const VerifyEmail=async ({token,email})=>{
    try {
      await axios.post("/api/v1/auth/verifyEmail",{token,email})
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }


  const resetPassword=async ({email})=>{
    try {
      await axios.post("/api/v1/auth/resetPassword",{email})
      dispatch({type:RESETPASSWORD_SUCCESS})
    } catch (error) {
      dispatch({type:RESETPASSWORD_ERROR,payload:{msg:error.response.data.msg}})
    }
    clearAlert()
  }

  const resetPasswordComplete=async ({email,token,newPassword})=>{
    try {
      await axios.post("/api/v1/auth/resetPasswordComplete",{email,token,newPassword})
      dispatch({type:RESETPASSWORDCOMPLETE_SUCCESS})
    } catch (error) {
      dispatch({type:RESETPASSWORDCOMPLETE_ERROR,payload:{msg:error.response.data.msg}})
    }
    clearAlert()
  }

  
  

  

  function logoutUser(){
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage()
  }



  const uploadImage=async (event)=>{
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image',imageFile)
    try {
    //  const {data:{image:{src}}} = await axios.post("/api/v1/post/upload"

     const {data:{image:{src}}} = await authFetch.post("/post/upload"
    
     ,formData,{
      headers:{
       'Content-Type':'multipart/form-data'
      }
     }
     )
     dispatch({type:UPLOAD_IMAGE,
      payload:{
        image:src
      }
    })

    console.log(src)
    } catch (error) {
      
     console.log(error.response.data.msg);
    }
  }

  function changeFunction(e){
    dispatch({type:HANDLE_CHANGE,
    payload:{
      name:e.target.name,
      value:e.target.value
    }})
  }


  function clearuploads(){
    dispatch({type:CLEAR_UPLOADS})
  }



  function changepage(page){
      dispatch({type:CHANGE_PAGE,payload:{page:page}})
  }

  console.log(new Date().getTime())


  
 




  

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        // setupUser,
        logoutUser,
        uploadImage,
        changeFunction,
        clearuploads,
        changepage,
        loginfun,
        registerfunction,
        VerifyEmail,
        resetPassword,
        resetPasswordComplete
    
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
