import React from 'react';
import { Link } from 'react-router-dom';
import tune from '../assets/tune.png';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    name: '',
    // loading: false,
  };

  componentDidMount() {
    this.handleUser();
  }

  handleUser = () => {
    this.setState({
      // loading: true,
    }, async () => {
      const userName = await getUser();
      this.setState({
        name: userName.name,
        // loading: false,
      });
    });
  };

  render() {
    const { name } = this.state;

    // if (loading) {
    //   return (<Carregando />);
    // }
    return (
      <header className="header-content" data-testid="header-component">
        <div className="header-top">
          <h2 className="title">Filipe Tunes</h2>
          <img src={ tune } alt="tune" />
        </div>
        <nav className="links">
          <ul>
            <li className="links-list">
              <Link data-testid="link-to-search" to="/search">Busca</Link>
              {/* <Link to="/album/:id">Album</Link> */}
              <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
              <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
              <Link to="/profile/edit">Editar Perfil</Link>
            </li>
          </ul>
        </nav>
        <div className="user-name">
          <p data-testid="header-user-name">{ name }</p>
        </div>
      </header>
    );
  }
}

export default Header;
