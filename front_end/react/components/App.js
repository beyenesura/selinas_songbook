import React, { useState, useEffect } from 'react';
import { handleEditSong,handleRegisterSubmit,handleLoginSubmit,handleAllSongs,handleOneSong,handleAddSong,handleDeleteSong,handleEditUser} from './api_calls';
import { SongList } from './SongList';
export const App = () => {
  // State holds the current file that is to be uploaded to the server
  const [page,setPage] = useState('homepage')
  const [username,setUsername] = useState()
  const [password,setPassword] = useState()
  const [superUser,setSuperUser] = useState()
  const [someToken,setSomeToken] = useState()
  const [ifToken,setIfToken] = useState(false)
  const [allSongs,setAllSongs]= useState()
  const [song,setSong] = useState()
  const [returnedSong,setReturnedSong] = useState()



  /* States for Adding Songs */

  const [title,setTitle] =useState()
  const [author,setAuthor] =useState()
  const [lyrics,setLyrics] =useState()





  /* States Editing User */


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
          <button onClick={(e)=>setPage('some_song')}>Get A Song </button>
          <button onClick={(e)=>setPage('add_song')}>Add A song</button>
          <button onClick={(e)=>setPage('edit_song')}>Edit A Song</button>
          <button onClick={(e)=>setPage('delete_song')}>Delete A Song</button>
          <button onClick={(e)=>setPage('edit_user')}>Edit a User</button>
        </div>

      )


  }


  else if(page==='all_songs'){
    console.log(allSongs)
    return (
        <div>
          <SongList songlist={allSongs} setPG={setPage}/>
        </div>

    )
  }

  else if(page==='all_songs_failed'){
    return(
      <div className="top_level_container">
        <h3>Error on finding Songs</h3>
        <button onClick={(e)=>handleAllSongs(e,setPage,setAllSongs,someToken)}>Get Songs</button>
        <button onClick={(e)=>setPage('some_song')}>Get A Song </button>
        <button onClick={(e)=>setPage('add_song')}>Add A song</button>
        <button onClick={(e)=>setPage('edit_song')}>Edit A Song</button>
        <button onClick={(e)=>setPage('delete_song')}>Delete A Song</button>
        <button onClick={(e)=>setPage('edit_user')}>Edit a User</button>
      </div>
      )
  }
  else if(page==='some_song'){

    return (
        <div>
         
         <form onSubmit={(e) => handleOneSong(e,setPage,song,someToken,setReturnedSong)}>
          <input type="text" onChange={(e) => setSong(e.target.value)} placeholder='song name'/>
          <input type='submit' value='Find Song'></input>
        </form>


        </div>

    )
  }






  else if(page==='song_returned' && !returnedSong){

    return(
    <div className="top_level_container">
      <h3>Error on finding Song</h3>
      <button onClick={(e)=>handleAllSongs(e,setPage,setAllSongs,someToken)}>Get Songs</button>
      <button onClick={(e)=>setPage('some_song')}>Get A Song </button>
      <button onClick={(e)=>setPage('add_song')}>Add A song</button>
      <button onClick={(e)=>setPage('edit_song')}>Edit A Song</button>
      <button onClick={(e)=>setPage('delete_song')}>Delete A Song</button>
      <button onClick={(e)=>setPage('edit_user')}>Edit a User</button>
    </div>
    )
  

  }else if(page==='song_returned'){
    return(
      <div>
        <h3>{returnedSong}</h3>
        <button onClick={(e)=>setPage('homepage')}>Homepage</button>
      </div>
    )
  }

  




  else if(page==='add_song'){

    return (
        <div>
         
         <form onSubmit={(e) => handleAddSong(e,setPage,title,author,lyrics,someToken)}>
          <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='song title'/>
          <input type="text" onChange={(e) => setAuthor(e.target.value)} placeholder='author name'/>
          <input type="text" onChange={(e) => setLyrics(e.target.value)} placeholder='lyrics'/>
          <input type='submit' value='Add Song'></input>
        </form>


        </div>

    )
  }



  else if(page==='added_song_error'){

    return(
      <div className="top_level_container">
        <h3>Error on Adding Song</h3>
        <button onClick={(e)=>handleAllSongs(e,setPage,setAllSongs,someToken)}>Get Songs</button>
        <button onClick={(e)=>setPage('some_song')}>Get A Song </button>
        <button onClick={(e)=>setPage('add_song')}>Add A song</button>
        <button onClick={(e)=>setPage('edit_song')}>Edit A Song</button>
        <button onClick={(e)=>setPage('delete_song')}>Delete A Song</button>
        <button onClick={(e)=>setPage('edit_user')}>Edit a User</button>
      </div>
      )

  }

  else if(page==='added_song_success'){

    return(
      <div className="top_level_container">
        <h3>Song Added Successfully</h3>
        <button onClick={(e)=>handleAllSongs(e,setPage,setAllSongs,someToken)}>Get Songs</button>
        <button onClick={(e)=>setPage('some_song')}>Get A Song </button>
        <button onClick={(e)=>setPage('add_song')}>Add A song</button>
        <button onClick={(e)=>setPage('edit_song')}>Edit A Song</button>
        <button onClick={(e)=>setPage('delete_song')}>Delete A Song</button>
        <button onClick={(e)=>setPage('edit_user')}>Edit a User</button>
      </div>
      )

  }

  else if(page==='edit_song'){

      return (
        <div>
        
        <form onSubmit={(e) => handleEditSong(e,setPage,title,author,lyrics,someToken)}>
          <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='song title'/>
          <input type="text" onChange={(e) => setAuthor(e.target.value)} placeholder='author name'/>
          <input type="text" onChange={(e) => setLyrics(e.target.value)} placeholder='lyrics'/>
          <input type='submit' value='Edit Song'></input>
        </form>


        </div>

    )
  }

  else if(page==='edit_song_failed'){
    return(
      <div className="top_level_container">
        <h3>Error on Editing Song</h3>
        <button onClick={(e)=>handleAllSongs(e,setPage,setAllSongs,someToken)}>Get Songs</button>
        <button onClick={(e)=>setPage('some_song')}>Get A Song </button>
        <button onClick={(e)=>setPage('add_song')}>Add A song</button>
        <button onClick={(e)=>setPage('edit_song')}>Edit A Song</button>
        <button onClick={(e)=>setPage('delete_song')}>Delete A Song</button>
        <button onClick={(e)=>setPage('edit_user')}>Edit a User</button>
      </div>
      )

  }


  else if(page==='edit_song_success'){
    return(
      <div className="top_level_container">
        <h3>Song Edited Successfully</h3>
        <button onClick={(e)=>handleAllSongs(e,setPage,setAllSongs,someToken)}>Get Songs</button>
        <button onClick={(e)=>setPage('some_song')}>Get A Song </button>
        <button onClick={(e)=>setPage('add_song')}>Add A song</button>
        <button onClick={(e)=>setPage('edit_song')}>Edit A Song</button>
        <button onClick={(e)=>setPage('delete_song')}>Delete A Song</button>
        <button onClick={(e)=>setPage('edit_user')}>Edit a User</button>
      </div>
      )
  }


  else if(page==='delete_song'){
    return (
      <div>
      
      <form onSubmit={(e) => handleDeleteSong(e,setPage,title,someToken)}>
        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='song title'/>
        <input type='submit' value='Delete Song'></input>
      </form>


      </div>

  )
  }


  else if(page==='delete_song_failed'){

    return(
      <div className="top_level_container">
        <h3>Error on Deleting Song</h3>
        <button onClick={(e)=>handleAllSongs(e,setPage,setAllSongs,someToken)}>Get Songs</button>
        <button onClick={(e)=>setPage('some_song')}>Get A Song </button>
        <button onClick={(e)=>setPage('add_song')}>Add A song</button>
        <button onClick={(e)=>setPage('edit_song')}>Edit A Song</button>
        <button onClick={(e)=>setPage('delete_song')}>Delete A Song</button>
        <button onClick={(e)=>setPage('edit_user')}>Edit a User</button>
      </div>
      )

  }

  else if(page==='delete_song_success'){

    return(
      <div className="top_level_container">
        <h3>Successfully Deleted Song</h3>
        <button onClick={(e)=>handleAllSongs(e,setPage,setAllSongs,someToken)}>Get Songs</button>
        <button onClick={(e)=>setPage('some_song')}>Get A Song </button>
        <button onClick={(e)=>setPage('add_song')}>Add A song</button>
        <button onClick={(e)=>setPage('edit_song')}>Edit A Song</button>
        <button onClick={(e)=>setPage('delete_song')}>Delete A Song</button>
        <button onClick={(e)=>setPage('edit_user')}>Edit a User</button>
      </div>
      )

  }
  else if(page==='edit_user_success'){

    return(
      <div className="top_level_container">
        <h3>Successfully Edited User</h3>
        <button onClick={(e)=>handleAllSongs(e,setPage,setAllSongs,someToken)}>Get Songs</button>
        <button onClick={(e)=>setPage('some_song')}>Get A Song </button>
        <button onClick={(e)=>setPage('add_song')}>Add A song</button>
        <button onClick={(e)=>setPage('edit_song')}>Edit A Song</button>
        <button onClick={(e)=>setPage('delete_song')}>Delete A Song</button>
        <button onClick={(e)=>setPage('edit_user')}>Edit a User</button>
      </div>
      )

  }
  else if(page==='edit_user_failed'){

    return(
      <div className="top_level_container">
        <h3>Failed to edit user</h3>
        <button onClick={(e)=>handleAllSongs(e,setPage,setAllSongs,someToken)}>Get Songs</button>
        <button onClick={(e)=>setPage('some_song')}>Get A Song </button>
        <button onClick={(e)=>setPage('add_song')}>Add A song</button>
        <button onClick={(e)=>setPage('edit_song')}>Edit A Song</button>
        <button onClick={(e)=>setPage('delete_song')}>Delete A Song</button>
        <button onClick={(e)=>setPage('edit_user')}>Edit a User</button>
      </div>
      )

  }

  else if(page==='edit_user'){
    return (
      <div>
      
      <form onSubmit={(e) => handleEditUser(e,setPage,username,password,superUser,someToken)}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
        <input type="text" onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
        <input type="text" onChange={(e) => setSuperUser(e.target.value)} placeholder='superuser'/>
        <input type='submit' value='Edit User'></input>
      </form>


      </div>

  )
  }
}