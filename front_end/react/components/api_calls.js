const handleRegisterSubmit = (e,un,pw) =>{
    e.preventDefault()


    if(!un || !pw){
        return 1
    }

    console.log(JSON.stringify({username:un,password:pw}))
    fetch('http://127.0.0.1:5000/register',{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({username:un,password:pw})
    })

    .then((res)=>res.json())
    .then((data)=>{console.log(data['response'])})
    .catch((err)=>console.error(err))

}



const handleLoginSubmit = (e,un,pw,setToken,setIf) =>{
    e.preventDefault()


    if(!un || !pw){
        return 1
    }

    console.log(JSON.stringify({username:un,password:pw}))
    fetch('http://127.0.0.1:5000/login',{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({username:un,password:pw})
    })

    .then((res)=>res.json())
    .then((data)=>
    {

        setToken(data['response'])
        setIf(true)
        console.log(data['response'])
    })
    .catch((err)=>console.error(err))
    
}





const handleAllSongs = (e,setPG,setAS,token) =>{
    e.preventDefault()

    fetch('http://127.0.0.1:5000/get_songs',{
        method:'GET',
        headers: {
            'x-access-token':token
        },
    })

    .then((res)=>res.json())
    .then((data)=>
    {
        console.log(data['response'])
        if(data['response'].length===0){
            setPG('all_songs_failed')
        }else{
            setAS(data['response'])
            setPG('all_songs')
            
        }

    })
    .catch((err)=>console.error(err))
    
}




const handleOneSong = (e,setPG,song,token,setRS) =>{
    e.preventDefault()
    full_search = 'http://127.0.0.1:5000/get_song?' + `song=${song}`
    fetch(full_search,{
        method:'GET',
        headers: {
            'x-access-token':token
        },
    })

    .then((res)=>res.json())
    .then((data)=>
    {
            console.log(data)
            setRS(data['response'])
            setPG('song_returned')
    
    })
    .catch((err)=>console.error(err))
    
}







const handleAddSong = (e,setPG,title,author,lyrics,token) =>{
    e.preventDefault()
    console.log(JSON.stringify({title:title,author:author,lyrics:lyrics}))
    fetch('http://127.0.0.1:5000/add_song',{
        method:'POST',
        headers: {
            'Content-type':'application/json', 
            'Accept':'application/json',
            'x-access-token':token
        },
        body:JSON.stringify({title:title,author:author,lyrics:lyrics})
    })

    .then((res)=>res.json())
    .then((data)=>
    {

        console.log(data['success'])
        if( !(data['success'])){
            setPG('added_song_error')
        }else{
            setPG('added_song_success')
        }



            console.log(data)
    
    })
    .catch((err)=>console.error(err))
    
}

const handleEditSong = (e,setPG,title,author,lyrics,token) =>{
    e.preventDefault()
    console.log(JSON.stringify({title:title,author:author,lyrics:lyrics}))
    fetch('http://127.0.0.1:5000/edit_song',{
        method:'POST',
        headers: {
            'Content-type':'application/json', 
            'Accept':'application/json',
            'x-access-token':token
        },
        body:JSON.stringify({title:title,author:author,lyrics:lyrics})
    })

    .then((res)=>res.json())
    .then((data)=>
    {

        console.log(data['success'])
        if( !(data['success'])){
            setPG('edit_song_failed')
        }else{
            setPG('edit_song_success')
        }



            console.log(data)
    
    })
    .catch((err)=>console.error(err))
    
}


const handleDeleteSong = (e,setPG,title,token) =>{
    e.preventDefault()
    console.log(JSON.stringify({title:title}))
    fetch('http://127.0.0.1:5000/delete_song',{
        method:'DELETE',
        headers: {
            'Content-type':'application/json', 
            'Accept':'application/json',
            'x-access-token':token
        },
        body:JSON.stringify({title:title})
    })

    .then((res)=>res.json())
    .then((data)=>
    {

        console.log(data['success'])
        if( !(data['success'])){
            setPG('delete_song_failed')
        }else{
            setPG('delete_song_success')
        }



            console.log(data)
    
    })
    .catch((err)=>console.error(err))
    
}


module.exports = {handleRegisterSubmit,handleLoginSubmit,handleAllSongs,handleOneSong,handleAddSong,handleEditSong,handleDeleteSong}