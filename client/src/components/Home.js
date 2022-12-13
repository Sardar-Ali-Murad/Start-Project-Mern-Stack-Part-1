import React from 'react'
import LockIcon from '@mui/icons-material/Lock';
import { useAppContext } from '../context/appContext';

const Home = () => {
  let { logoutUser}=useAppContext()
  return (
    <div style={{display:"flex",justifyContent:"space-around"}} className="swction__padding">
      Home
    </div>
  )
}

export default Home
