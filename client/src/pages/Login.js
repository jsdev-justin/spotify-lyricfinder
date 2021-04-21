import React from "react"

let CLIENTID=process.env.CLIENTID
let url =`https://accounts.spotify.com/authorize?client_id=${CLIENTID}&response_type=code&redirect_uri=http://localhost:3000`

const Login = () =>{

    return (
        <div className="login-app flex center">
        <a href={url} className="login-btn btn flex center">Login to Spotify</a>
        </div>
    )
}


export default Login;