import React, { useState, useEffect } from 'react';
import { handleRegisterSubmit,handleLoginSubmit,handleAllSongs } from './api_calls';
import { SongList } from './SongList';
export const App = () => {
  // State holds the current file that is to be uploaded to the server
  const [page,setPage] = useState('homepage')
  const [username,setUsername] = useState()
  const [password,setPassword] = useState()
  const [someToken,setSomeToken] = useState()
  const [ifToken,setIfToken] = useState(false)
  const [allSongs,setAllSongs]= useState()
  const [someSong,setSomeSong] = useState()





  if (page==='homepage' && !ifToken){




    return(
    <div className="top_level_container">
        <button onClick={(e)=>setPage('login')}>Login</button>
        <button onClick={(e)=>setPage('register')}>Register</button>
      </div>
    )

  } else if(page==='homepage'){


    return(
      <div className="top_level_container">
          <button onClick={(e)=>setPage('viewdata')}>ViewData</button>
        </div>
      )
  




  }else if (page==='login'){




    return (
      <div className="top_level_container">


        <form onSubmit={(e) => handleLoginSubmit(e,username,password,setSomeToken,setIfToken)}>
          <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
          <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
          <input type='submit' value='Login'></input>
        </form>

        <button onClick={(e)=>setPage('homepage')}>Homepage</button>
      </div>




    )







  }else if (page==='register'){
    return (
      <div className="top_level_container">


        <form onSubmit={(e) => handleRegisterSubmit(e,username,password)}>
          <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
          <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
          <input type='submit' value='Register'></input>
        </form>

        <button onClick={(e)=>setPage('homepage')}>Homepage</button>
      </div>




    )
  }else if(page==='viewdata'){
      console.log(someToken)
      return (
        <div className="top_level_container">
          <button onClick={(e)=>handleAllSongs(e,setPage,setAllSongs,someToken)}>Get Songs</button>
          <button onClick={(e)=>handleOneSong(e,setPage,someToken)}>Get A Song </button>
          <button>Add A song</button>
          <button>Edit A Song</button>
          <button>Delete A Song</button>
        </div>

      )


  }


  else if(page==='all_songs'){

    return (
        <div>
          <SongList songlist={allSongs} setPG={setPage}/>
        </div>

    )
  }

  else if(page==='some_song'){

    return (
        <div>
          <SongList songlist={allSongs} setPG={setPage}/>
        </div>

    )
  }
}