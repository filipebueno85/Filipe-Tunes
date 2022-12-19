import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  state = {
    // album: '',
    favorita: false,
    loading: false,
  };

  async componentDidMount() {
    await this.favoritas();
  }

  handle = async ({ target }) => {
    const { song, removeFavorite, trackId } = this.props;
    const { checked } = target;
    this.setState({
      loading: true,
      favorita: true,
    });
    if (checked) {
      // const resultado = await getMusics(trackId);
      // console.log(song);
      await addSong(song);
    } else {
      // const resultado = await getMusics(trackId);
      await removeSong(song);
      if (removeFavorite) {
        removeFavorite(trackId);
      }
    }
    this.setState({
      loading: false,
      favorita: checked,
    });
  };

  favoritas = async () => {
    const { trackId } = this.props;
    const getFavorite = await getFavoriteSongs();
    this.setState({
      favorita: getFavorite.some((music) => music.trackId === trackId),
    });
    // console.log(getFavorite);
  };

  render() {
    const { trackName, trackId, artistName, previewUrl } = this.props;

    const { loading, favorita } = this.state;

    return (
      <div className="preview">
        {loading ? <Carregando /> : (
          <ul>
            <li>
              { `${trackName} - ${artistName}`}
              {' '}
              <br />
              <div className="div-fav">

                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor="favorita">
                  <input
                    className="field sr-only"
                    data-testid={ `checkbox-music-${trackId}` }
                    type="checkbox"
                    checked={ favorita }
                    onChange={ this.handle }
                    name="favorita"
                    id="favorita"
                  />
                </label>
              </div>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  song: PropTypes.string.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};
