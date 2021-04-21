import React, {useState, useEffect} from "react"



export const useSpotify = code =>{
    const [accessToken, setAccessToken] = useState("")
    const [refreshToken, setRefreshToken] = useState("")
    const [expiresIn, setExpiresIn] = useState("")


    useEffect(()=>{
        if(!code)return;
        console.log("useGoogle fired!")
        window.history.pushState(null,{},"/")

        fetch(`http://localhost:3005/login`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({code})
        })
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)
            // console.log(res.accessToken)
            setAccessToken(res.accessToken)
            setRefreshToken(res.refreshToken)
            setExpiresIn(res.expiresIn)
            // console.log(accessToken)
        })
        .catch(err=>{
            console.log("Error -- redirecting back to /")
            window.location="/"
        })
    },[code])


    useEffect(()=>{
        if(!refreshToken || !expiresIn) return;
        let refreshInt = setInterval(()=>{
        fetch(`http://localhost:3005/refresh`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({refreshToken})
        })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            setAccessToken(res.accessToken)
            setExpiresIn(res.expiresIn)
        })
        .catch(err=>{
            console.log("error on the refresh.")
            clearInterval(refreshInt)
        })
    },(expiresIn-60)*1000)
        
    },[refreshToken,expiresIn])

    // console.log("AccessToken: " + accessToken)
    return accessToken
 
}