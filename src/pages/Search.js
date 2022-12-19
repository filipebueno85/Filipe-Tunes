// import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Footer from '../components/Footer';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    name: '',
    album: false,
    // busca: '',
    // messagemNotFound: false,
    loading: false,
    isDisabled: true,
  };

  // componentDidMount() {
  //   this.handleClick();
  // }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    const resultado = await searchAlbumsAPI(name);
    this.setState({
      loading: false,
      album: resultado,
    });
  };

  inputText = ({ target }) => {
    const dois = 2;
    const { value, name } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (value.length >= dois) {
          this.setState({
            isDisabled: false,
          });
        }
      },
    );
  };

  render() {
    const { isDisabled, loading, album, name } = this.state;
    if (loading) {
      return (<Carregando />);
    }
    return (
      <div className="pesquisa-content" data-testid="page-search">
        <Header />
        <form className="pesquisa">
          <h2>Busque seu Artista ou Banda Favorita!</h2>
          <div>
            <input
              data-testid="search-artist-input"
              type="text"
              name="name"
              onChange={ this.inputText }
              placeholder="Busque aqui!"
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </div>
          <div className="pesquisa-content">
            { album && (album.length !== 0 ? (
              <div className="pesquisa-result">
                <h2>{`Resultado de álbuns de: ${name}`}</h2>
                {album.map((alb) => (
                  <Link
                    key={ alb.collectionId }
                    data-testid={ `link-to-album-${alb.collectionId}` }
                    to={ `/album/${alb.collectionId}` }
                  >
                    <div className="pesquisa-album">
                      <img src={ alb.artworkUrl100 } alt={ alb.name } />
                      <div>
                        <p>{`${alb.collectionName}`}</p>
                        <p>{`Lançamento:  ${alb.releaseDate.split('-').splice(0, 1)}`}</p>
                      </div>
                    </div>
                  </Link>))}
              </div>)
              : <span>Nenhum álbum foi encontrado</span>)}
          </div>
        </form>
        <Footer />
      </div>
    );
  }
}

export default Search;

// Search.propTypes = {
//   history: PropTypes.func,
// }.isRequired;
