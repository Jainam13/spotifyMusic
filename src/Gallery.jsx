import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
  constructor(props) {
    super(props);
      this.state = {
        playingUrl: '',
        song: null,
        playing: false
        }
      }

      playAudio(previewUrl) {
        let song = new Audio(previewUrl);
          if (!this.state.playing) {
            song.play();
              this.setState({
                  playing: true,
                  playingUrl: previewUrl,
                  song
                  })
  } else {
    if (this.state.playingUrl === previewUrl) {
      this.state.song.pause();
      this.setState({
        playing: false
      })
    } else {
        this.state.song.pause();
        song.play();
          this.setState({
            playing: true,
            playingUrl: previewUrl,
            song
      })
    }
  }
}
render(){
    return (
    console.log()'gallary props',props);
    const tracks = this.props.tracks;

    <div>
      {tracks.map((track,k) => {
      console.log('track',track);
      const img = track.album.images[0].url;
      return(
        <div
          key={k}
          className="track"
          onClick={() => this.playAudio(track.preview_url)}
          >
        <img
          src={img}
          className="track-img"
          alt="track"
          />
          <p className="track-text">
          {track.name}
          </p>
          )
        }
      )}
    </div>
    )
  }
}

export default Gallery;
