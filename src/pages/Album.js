import PropTypes from 'prop-types';
import React from 'react';
import Carregando from '../components/Carregando';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    album: [],
    loading: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    });
    const resultado = await getMusics(id);
    // console.log(resultado);
    this.setState({
      loading: false,
      album: resultado,
    });
  }

  render() {
    const { loading, album } = this.state;
    if (loading) {
      return (<Carregando />);
    }
    return (
      <div data-testid="page-album">
        <Header />
        { album.length > 0
        && (
          <div>
            <div className="album-header">

              <img className="album-img" src={ album[0].artworkUrl100 } alt="foto" />

              <div className="album-info">
                <h3 data-testid="album-name">{album[0].collectionName}</h3>
                <p data-testid="artist-name">{album[0].artistName}</p>
                <p>{`Lançamento: ${album[0].releaseDate.split('-')[0]}`}</p>
              </div>
            </div>
            <br />
            <div className="musicas">
              <p>{`${album[0].trackCount} Músicas`}</p>
              {album.map((song) => (
                song.kind && (
                  <MusicCard
                    artistName={ song.artistName }
                    artworkUrl100={ song.artworkUrl100 }
                    trackId={ song.trackId }
                    trackName={ song.trackName }
                    previewUrl={ song.previewUrl }
                    key={ song.trackId }
                    song={ song }
                  />
                )
              ))}
            </div>
          </div>)}
        <Footer />
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
