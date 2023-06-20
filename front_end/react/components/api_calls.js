const handleRegisterSubmit = (e,username,password) =>{
    e.preventDefault()


    const data = new FormData()
    data.append("username",username)
    data.append("password",password)


    if(!data){
        return
    }

    fetch('http:/locahost:5000/register',{
        method:'POST',
        body:data,
    })
    
    .then((res)=>res.json())
    .catch((err)=>console.error(err))
}



module.exports = {handleRegisterSubmit}