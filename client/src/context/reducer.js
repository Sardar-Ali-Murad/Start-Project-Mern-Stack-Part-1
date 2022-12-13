
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
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  RESETPASSWORD_ERROR,
  RESETPASSWORD_SUCCESS,
   RESETPASSWORDCOMPLETE_ERROR,
   RESETPASSWORDCOMPLETE_SUCCESS

} from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    }
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    }
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type===LOGOUT_USER){
    return{
      ...initialState,
      token:null,
      user:null
    }
  }

  if(action.type===UPLOAD_IMAGE){
    return{
      ...state,
      image:action.payload.image
    }
  }

  if(action.type===HANDLE_CHANGE){
    return{
      ...state,
      [action.payload.name]:action.payload.value
    }
  }

  if(action.type===CLEAR_UPLOADS){
    return{
      ...state,
      // image:"",
      // tag:"",
      // title:"",
      // message:"",
    }
  }


  if(action.type===CHANGE_PAGE){
    return{
      ...state,
      page:action.payload.page
    }
  }


  
  if(action.type===REGISTER_USER_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===REGISTER_USER_SUCCESS){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertText:"Regsiter Success!Please Vefify Your Email",
      alertType:"success"
    }
  }


  if(action.type===REGISTER_USER_ERROR){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger"
    }
  }


  if(action.type===LOGIN_USER_BEGIN){
    return{
      ...state,
      isLoading:true
    }
  }

  if(action.type===LOGIN_USER_SUCCESS){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertText:"Login Success!Redirecting",
      alertType:"success",
      token:action.payload.token,
      user:action.payload.user
    }
  }
  if(action.type===LOGIN_USER_ERROR){
    return{
      ...state,
      isLoading:false,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger"
    }
  }

  if(action.type===RESETPASSWORD_SUCCESS){
    return{
      ...state,
      showAlert:true,
      alertText:"Success!Check You Email And Change Password",
      alertType:"success"
    }
  }

  if(action.type===RESETPASSWORD_ERROR){
    return{
      ...state,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger"
    }
  }

  if(action.type===RESETPASSWORDCOMPLETE_SUCCESS){
    return{
      ...state,
      showAlert:true,
      alertText:"Success!Check Now Go Login Again",
      alertType:"success"
    }
  }

  if(action.type===RESETPASSWORDCOMPLETE_ERROR){
    return{
      ...state,
      showAlert:true,
      alertText:action.payload.msg,
      alertType:"danger"
    }
  }



  throw new Error(`no such action : ${action.type}`)
}

export default reducer
