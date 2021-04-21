import React from "react"
import {Login, Home} from "./pages"
import "./App.css"

let code = new URLSearchParams(window.location.search).get('code')

const App = () =>{

    return !code ? <Login/> : <Home code={code}/>
}

export default App;