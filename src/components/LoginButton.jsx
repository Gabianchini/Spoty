const LoginButton = () => {
    const CLIENT_ID = "526e1a9972be468a904169c9f6f850e1"
    const REDIRECT_URI = "http://localhost:5174/callback/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
  
          return(
             
            <button className="Btn-login"><a className="Btn-logLink" role="button" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}> Login to Spotify</a></button>
             
      )
   }
  
  
  
  
  export default LoginButton