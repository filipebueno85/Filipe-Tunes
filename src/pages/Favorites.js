import React from 'react';
import Carregando from '../components/Carregando';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favorita: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const resultado = await getFavoriteSongs();
    // console.log(resultado);
    this.setState({
      loading: false,
      favorita: resultado,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { favorita } = this.state;
    return nextState.favorita !== favorita;
  }

  removeFavorite = (id) => {
    this.setState((prevState) => ({
      favorita: prevState.favorita.filter((fav) => fav.trackId !== id),
    }));
  };

  // async componentDidUpdate() {
  //   const resultado = await getFavoriteSongs();
  //   // console.log(resultado);
  //   this.setState({
  //     favorita: resultado,
  //   });
  // }
  // favoriteClicks = () => {

  // };

  render() {
    const { loading, favorita } = this.state;

    if (loading) {
      return (<Carregando />);
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorite-container">
          <h2>Favoritos</h2>
          {/* <p>{favorita[0].trackName}</p> */}
          {favorita.map((song) => (

            <MusicCard
              artistName={ song.artistName }
              trackId={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
              key={ song.trackId }
              song={ song }
              removeFavorite={ this.removeFavorite }
            />

          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Favorites;
