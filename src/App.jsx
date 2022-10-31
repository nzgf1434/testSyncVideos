import React , { useState, useCallback, useRef, useEffect } from "react";

import YouTube from "react-youtube";

import './App.css';

function App() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [preload, setPreload] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoEl1 = useRef();
  const videoEl2 = useRef();

  
  useEffect(() => {      // First preload for both players
    videoEl1.current.internalPlayer.seekTo(0);    
    videoEl1.current.internalPlayer.pauseVideo();
    videoEl2.current.internalPlayer.seekTo(0);
    videoEl2.current.internalPlayer.pauseVideo();
  }, [preload]);

  const handleStartButton = useCallback(() => {
    if (!!youtubeLink) setPreload(true);
  }, [youtubeLink]);

  const handleInputChange = useCallback((event) => {
    setYoutubeLink(event.target.value);
  }, []);

  const handleOnPause1Video = useCallback(e => {
    videoEl2.current.internalPlayer.seekTo(e.target.getCurrentTime(), true);
    videoEl2.current.internalPlayer.pauseVideo(); 
    setIsPlaying(false);     
  }, []);

  const handleOnPause2Video = useCallback(e => {
    videoEl1.current.internalPlayer.seekTo(e.target.getCurrentTime(), true);
    videoEl1.current.internalPlayer.pauseVideo(); 
    setIsPlaying(false); 
  }, []);

  const handleOnPlay1Video = useCallback(e => {
    if (!isPlaying) { 
      videoEl2.current.internalPlayer.seekTo(e.target.getCurrentTime(), true); 
      videoEl2.current.internalPlayer.playVideo(e.target.getCurrentTime()); 
    }    
    setIsPlaying(true); 
  }, [isPlaying]);

  const handleOnPlay2Video = useCallback(e => { 
    if (!isPlaying) {
      videoEl1.current.internalPlayer.seekTo(e.target.getCurrentTime(), true); 
      videoEl1.current.internalPlayer.playVideo(e.target.getCurrentTime());  
    } ;     
    setIsPlaying(true); 
  }, [isPlaying]); 

  const videoId = useCallback(() => youtubeLink ? youtubeLink.split("v=")[1] : "", [youtubeLink]);

  /*****  Player1  Controls  ********/
  
  const handlerCustomPlay1 = useCallback(() => {
    videoEl1.current.internalPlayer.playVideo();
  }, []);

  const handlerCustomPause1 = useCallback(() => {
    videoEl1.current.internalPlayer.pauseVideo()
  }, []);

  /*****  Player2  Controls  ********/

  const handlerCustomPlay2 = useCallback(() => {
    videoEl2.current.internalPlayer.playVideo();
  }, []);

  const handlerCustomPause2 = useCallback(() => {
    videoEl2.current.internalPlayer.pauseVideo()
  }, []);

  /*****  General  Controls  ********/

  const handlerCustomPlayGeneral = useCallback(() => {
    videoEl2.current.internalPlayer.playVideo();
    videoEl1.current.internalPlayer.playVideo();
  }, []);

  const handlerCustomPauseGeneral = useCallback(() => {
    videoEl2.current.internalPlayer.pauseVideo();
    videoEl1.current.internalPlayer.pauseVideo();
  }, []);

  const handlerCustomStop = useCallback(() => {
    videoEl1.current.internalPlayer.stopVideo();
    videoEl2.current.internalPlayer.stopVideo();
  }, []);

  return (
    <div className="App">
      <div className="url-container">
        <label className="url-label" htmlFor="url">Enter youtube url:</label>
        <input className="url-input" id="url" type="text" onChange={handleInputChange} value={youtubeLink} />    
        <button className="button button-sync" type="button" onClick={handleStartButton}>Load link and sync</button>
      </div>  
      <div className="video-container">
        <div className="video-part-container">
          <YouTube 
            videoId={videoId(youtubeLink)}
            onPause={handleOnPause1Video}
            onPlay={handleOnPlay1Video}
            ref={videoEl1}
            loading="eager"
          />
          <div className="control-menu-wrapper">
            <button className="button" onClick={handlerCustomPlay1}>Play</button>
            <button className="button" onClick={handlerCustomPause1}>Pause</button>
            <button className="button" onClick={handlerCustomStop}>Stop</button>
          </div>         
        </div>
        <div className="video-part-container">
          <YouTube 
            videoId={videoId(youtubeLink)}
            onPause={handleOnPause2Video}
            onPlay={handleOnPlay2Video}
            ref={videoEl2}
            loading="eager"
          />
          <div className="control-menu-wrapper">
            <button className="button" onClick={handlerCustomPlay2}>Play</button>
            <button className="button" onClick={handlerCustomPause2}>Pause</button>
            <button className="button" onClick={handlerCustomStop}>Stop</button>
          </div>          
        </div>        
      </div>    
      <div className="general-control-menu-wrapper">
        <p>General Control</p>
        <button className="button" onClick={handlerCustomPlayGeneral}>Play</button>
        <button className="button" onClick={handlerCustomPauseGeneral}>Pause</button> 
        <button className="button" onClick={handlerCustomStop}>Stop</button>   
      </div>      
    </div>
  );
}

export default App;
