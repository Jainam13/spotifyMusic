import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      text: '',
      artist: null,
      tracks: []
    }
  }

  search(){
  console.log('this.state',this.state);
  const SPOTIFY_URL = 'https://api.spotify.com/v1/search?'
  const GET_URL = SPOTIFY_URL + 'q =' + this.state.text + '&type=artist&limit=1';
  const TRACKS_URL = 'https://api.spotify.com/v1/artists/';
      var accessToken = 'BQCqzt15Z__73QS3jd9zZ_0ud-chlNwnXdocu0-StYdcmRqoikSYciCMKGovGaVvOWU32zer5fPQh3yWArgiYRfPIuZ4jZtmV0UtTehpvH_d7Ep4C7gq1eT8o8DbKAtUhWVw5muv16px2DGPWA2Xb1osOq4hIOPTo1YQC1TCBV4OFcfBg_c&refresh_token=AQBn_E_gN6uLo63pRXgSTRSkZHDxNiSwwsVYwh3LG6r-D1frMzej4WeAVk6pkNPBEw6pgITqVhn_vjrMljywO6wh1-6S53KAzCVBmHxBMaZNINLy4YxCAOFzz1isR83392k'

      var myOptions = {
          method: 'GET',
          headers: {
              'Authorization': 'Bearer' + accessToken
          },
          mode: 'cors',
          cache: 'default'
      };

  console.log('GET_URL',GET_URL);
  fetch(GET_URL,myOptions, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(json => {
    const artist = json.artists.items[0];
    this.setState({artist: artist});

    GET_URL = `${TRACKS_URL}${artist.id}/top-tracks?country=US&`
    fetch(GET_URL,myOptions,{
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log('artist top tracks',json);
      const tracks = json.tracks;
      this.setState({tracks: tracks});
    })
  });
  }
render(){
  return (
  <div className="App">
    <div className="App-title"> Spotify Music</div>
    <FormGroup>
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Search for Artist"
          value={this.state.text}
          onChange={event => {this.setState({text: event.target.value})}}
          onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.search()
                }
                }}
          />
          <InputGroup.Addon onClick={() => this.search()}>
            <Glyphicon glyph="search"></Glyphicon>
          </InputGroup.Addon>
      </InputGroup>
    </FormGroup>
    {
        this.state.artist!=null
        ?
        <div>
        <Profile
        artist = {this.state.artist}
        />
        <Gallery tracks={this.state.tracks}/>
        </div>
        :<div></div>
    }
  </div>
    )
    }
}

export default App;
