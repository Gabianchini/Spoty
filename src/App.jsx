import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import HeaderIcon from "./components/Title";
import LoginButton from "./components/LoginButton";
import Subtitle from "./components/Subtitle";

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
  };

  const searchData = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        limit: 3,
        type: "album,artist,playlist,track",
      },
      
    });
    
    setArtist(data.artists.items);
    setAlbum(data.albums.items);
    setTrack(data.tracks.items);
    setPlaylist(data.playlists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <ul className="list" key={artist.id}>
        <li className="item">
          <img width="10%" src={artist.images[0].url} />
          {artist.name}
        </li>
      </ul>
    ));
  };
  const renderAlbum = () => {
    return albums.map((album) => (
      <ul className="list" key={album.id}>
        <li className="item">
          <img width="10%" src={album.images[0].url} />
          {album.name}
        </li>
      </ul>
    ));
  };

  const renderTrack = () => {
    return tracks.map((track) => (
      <ul className="list" key={track.id}>
        <li className="item">
          <img width="10%" src={track.album.images[0].url} />
          {track.name}
        </li>
      </ul>
    ));
  };

  const renderPlaylits = () => {
    return playlists.map((playlist) => (
      <ul className="list" key={playlist.id}>
        <li className="item">
          <img width="10%" src={playlist.images[0].url} />
          {playlist.name}
        </li>
      </ul>
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
           <form onSubmit={searchData}>
           <input type="text" className="searchBar" aria-label="searchBar" onChange={(e) => setSearchKey(e.target.value)}  />
           <button className="searchBtn"type={"submit"}></button>
           </form>
        ) : (
          <Subtitle></Subtitle>
        )}

      </header>
      <main className="listContainer">
        {renderArtists()}
        {renderAlbum()}
        {renderTrack()}
        {renderPlaylits()}
      </main>
    </div>
  );
}

export default App;
