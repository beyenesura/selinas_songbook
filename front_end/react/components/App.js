import React, { useState, useEffect } from 'react';
import { handleRegisterSubmit } from './api_calls';

export const App = () => {
  // State holds the current file that is to be uploaded to the server
  const [page,setPage] = useState('homepage')
  const [username,setUsername] = useState()
  const [password,setPassword] = useState()
  const [someToken,setSomeToken] = useState()


  if (page==='homepage'){




    return(
    <div className="top_level_container">
        <button onClick={(e)=>setPage('login')}>Login</button>
        <button onClick={(e)=>setPage('register')}>Register</button>
      </div>
    )






  }else if (page==='login'){




    return (
      <div className="top_level_container">
        <button>Whoops</button>
        <button onClick={(e)=>setPage('homepage')}>Homepage</button>
      </div>
    )







  }else if (page==='register'){
    return (
      <div className="top_level_container">


        <form onSubmit={(e) => handleRegisterSubmit(e,username,password)} encType='multipart/form-data'>
          <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
          <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
          <input type='submit' value='Register'></input>
        </form>

        <button onClick={(e)=>setPage('homepage')}>Homepage</button>
      </div>




    )
  }else if(page==='requestData'){
    
  }
}