import React, {useState, useEffect} from "react"
import {useSpotify} from "../useSpotify.js"
import SpotifyWebApi from "spotify-web-api-node";
import {SearchInput} from "../components"

let CLIENTID=process.env.CLIENTID

const spotifyApi = new SpotifyWebApi({clientId:CLIENTID})


const Home = ({code}) =>{
    const accessToken = useSpotify(code)
    const [query,setQuery] = useState("rihanna")
    const [musicData,setMusicData] = useState([]);
    const [lyrics,setLyrics] = useState("")


    console.log("AccessToken: " + accessToken)
    useEffect(()=>{
        if(!accessToken)return;
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])


    useEffect(()=>{
        if(!accessToken)return;
        console.log('searchTracks')
        spotifyApi.searchTracks(query)
        .then(res=>{
            console.log(res)
            console.log(res.body.tracks.items)
            setMusicData(res.body.tracks.items.map(t=>{
                let smallestImage = t.album.images.reduce((a,b)=>{
                    if(a > b) return b;
                    return a;
                })
                return{
                    artist:t.artists[0].name,
                    album:t.album.name,
                    cover:smallestImage.url,
                    track:t.name
                }
            }))
        })

    },[accessToken,query])

    const searchMusic=track=>{
        console.log("searchMusic: ",track)
        setLyrics("")
        setQuery(track)
    }


    const getLyrics=(track,artist)=>{
        console.log(track,artist)
   
        fetch(`http://localhost:3005/lyrics/${artist}/${track}`)
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            setLyrics(res.lyrics)
        })
    }
 return (
        <div className="homeApp">
            <div className="bg-blue text-center p-2 letter-spacing">
                <h1>Spotify Lyric Look-Up</h1>
            </div>
            <SearchInput searchMusic={searchMusic}/>
            {lyrics.length ? <div className="container text-center"><pre>{lyrics}</pre></div> :
            <div className="hero grid">
            <div className="container">

                {musicData.map((m,idx)=>(
                    <div key={idx}
                         className="p-2 text-shadow"
                         style={{borderBottom:'2px solid black'}}>
                    <h4>{m.artist}</h4>
                    <h5>Track:{m.track}</h5>
                    <img style={{padding:'.25em',height:'125px'}} src={m.cover} alt="album_cover"/>
                    <div className="flex">
                    <h5>{m.album}</h5><span className="badge" onClick={(e)=>getLyrics(m.track,m.artist)}>Lyrics</span>
                    </div>
                    </div>
                ))}
            </div>
            </div>
            }
        </div>
        
    )
}

export default Home;
