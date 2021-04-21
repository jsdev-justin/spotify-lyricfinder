const express = require('express');
const SpotifyWebApi = require("spotify-web-api-node");
const lyricsFinder = require("lyrics-finder");

const app = express();
const PORT = process.env.PORT || 3005;




app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET, POST");
    res.header("Access-Control-Allow-Headers","Content-Type");
    next()
})

const spotifyApi = new SpotifyWebApi({
    clientId:"f90b0e1edac64328aa50eaa95dadcbde",
    clientSecret:"52d2b8f4301848bdb9d5beb412dd4440",
    redirectUri:"http://localhost:3000"
})

if(process.env.NODE_ENV === "production"){
    console.log("app is in prod mode");
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/client/build/index.html'));
      });
}


app.get("/testing",(req,res)=>{
    console.log("path pinged");
    res.json({msg:"testing url"})
})

app.post("/login",(req,res)=>{
    console.log(req.body);
    spotifyApi.authorizationCodeGrant(req.body.code)
    .then(data=>{
        console.log(data.body)
    res.json({msg:"code received",
              accessToken:data.body.access_token,
              refreshToken:data.body.refresh_token,
              expiresIn:data.body.expires_in})
})
})


app.post("/refresh",(req,res)=>{
    console.log(req.body);
    spotifyApi.setRefreshToken(req.body.refreshToken)
    spotifyApi.refreshAccessToken().then(data=>{
        console.log(data.body)
        res.json({msg:"code received",
        accessToken:data.body.access_token,
        refreshToken:data.body.refresh_token,
        expiresIn:data.body.expires_in})
    })
    })


    app.get('/lyrics/:artist/:track',async(req,res)=>{
        console.log(req.params)
        let response = await lyricsFinder(req.params.artist,req.params.track)
            console.log(response)
            res.json({msg:"lyric req received",lyrics:response})
        
    })





app.listen(PORT,console.log(`Logged onto port ${PORT}.`))