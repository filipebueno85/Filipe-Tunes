import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    name: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const resultado = await getUser();
    this.setState({
      loading: false,
      name: resultado,
    });
  }

  render() {
    const { loading, name } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Carregando /> : (
          <div className="profile-container">
            <div className="profile-header">
              <img data-testid="profile-image" src={ name.image } alt="foto do Perfil" />
              <div>
                <h2>{name.name}</h2>
                <h4>{name.email}</h4>
              </div>
            </div>
            <div className="profile-description">
              <h3>Sobre:</h3>
              <br />
              <p>{name.description}</p>
            </div>
            <br />
            <button type="button">
              <Link to="/profile/edit">Editar perfil</Link>
            </button>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default Profile;
