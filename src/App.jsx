import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import HeaderIcon from "./components/HeaderIcon";
import LoginButton from "./components/LoginButton";
import Subtitle from "./components/Subtitle";
import vector from "./assets/vector.png"

function App() {

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtist] = useState([]);
  const [albums, setAlbum] = useState([]);
  const [tracks, setTrack] = useState([]);
  const [playlists, setPlaylist] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    document.querySelector(".list").classList.add("hide");

  };

  const searchData = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        limit: 2,
        type: "album,artist,playlist,track",
      },
      
    });
    
    setArtist(data.artists.items);
    setAlbum(data.albums.items);
    setTrack(data.tracks.items);
    setPlaylist(data.playlists.items);
  };

  const RenderArtists = () => {
    return artists.map((artist) => (
        <li className="item" key={artist.id}>
          <img className="imgList" src={artist.images[0].url} />
          <p className="titleItem">{artist.name}</p>
        </li>
    ));
  };
  const RenderAlbum = () => {
    return albums.map((album) => (
        <li className="item" key={album.id}>
          <img className="imgList" src={album.images[0].url} />
          <p className="titleItem">{album.name}</p>
        </li>
    ));
  };

  const RenderTrack = () => {
    return tracks.map((track) => (
        <li className="item" key={track.id}>
          <img className="imgList" src={track.album.images[0].url} />
          <p className="titleItem">{track.name}</p>
        </li>
    ));
  };

  const RenderPlaylits = () => {
    return playlists.map((playlist) => (
        <li className="item" key={playlist.id}>
          <img className="imgList" src={playlist.images[0].url} />
          <p className="titleItem">{playlist.name}</p>
        </li>
    ));
  };


  return (
    <div className="App">
      <header className="Header">
        <HeaderIcon></HeaderIcon>
        {!token ? (
          <LoginButton></LoginButton>
        ) : (
          <button className="Btn-logout" onClick={logout}>Logout</button>
        )}

   {token ? (
            
           <form onSubmit={searchData} className="formSearch">
           <input type="text" className="searchBar" aria-label="searchBar" onChange={(e) => setSearchKey(e.target.value)}/>
           <button className="searchBtn" type={"submit"} aria-label="Search for music, artist, track or playlist"></button> 
           </form>
        ) : (
          <Subtitle></Subtitle>
        )}

      </header>
      <div className="listContainer">
        <ul className="list">
        <RenderArtists></RenderArtists>
        <RenderAlbum></RenderAlbum>
        <RenderTrack></RenderTrack>
        <RenderPlaylits></RenderPlaylits>
        </ul>
      </div>
</div>
  );
}

export default App;
