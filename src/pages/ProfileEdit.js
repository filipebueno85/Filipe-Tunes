import PropTypes from 'prop-types';
import React from 'react';
import Carregando from '../components/Carregando';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    loading: false,
    // user: '',
    isDisabled: true,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    console.log(user);
    this.setState({
      loading: false,
      isDisabled: true,
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    }, this.validate);
  }

  inputText = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  };

  validate = () => {
    const { email, name, image, description } = this.state;
    const emailRegex = /^[a-z0-9.-_]+@[a-z0-9]+\.[a-z]+\)?$/i.test(email);
    if (email.length !== 0
      && image.length !== 0
      && name.length !== 0
      && description.length !== 0
      && emailRegex) {
      // const update = await updateUser();
      this.setState({
        isDisabled: false,
      });
    }
  };

  handlerUser = async () => {
    const { history: { push } } = this.props;
    const { name, email, image, description } = this.state;
    await updateUser({ name, email, image, description });
    // console.log(user);
    // this.setState({
    //   name: user.name,
    //   email: user.email,
    //   image: user.image,
    //   description: user.description,
    // });
    push('/profile');
  };

  render() {
    const { loading, name, email, image, description, isDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Carregando /> : (
          <div className="edit-profile-container">
            <h1>Editar Perfil:</h1>
            <br />
            <form className="form-edit-profile">
              <label htmlFor="name">
                Nome:
                <input
                  onChange={ this.inputText }
                  data-testid="edit-input-name"
                  type="text"
                  value={ name }
                  name="name"
                  id="name"
                />
              </label>
              <label htmlFor="email">
                E-mail:
                <input
                  data-testid="edit-input-email"
                  type="email"
                  name="email"
                  id="email"
                  value={ email }
                  onChange={ this.inputText }
                />
              </label>
              <p>
                Sobre:
              </p>
              <label htmlFor="description">
                <textarea
                  data-testid="edit-input-description"
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                  onChange={ this.inputText }
                  value={ description }
                />
              </label>
              <label htmlFor="image">
                Insira o link(Url imagem) da imagem:
                <input
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  id="image"
                  value={ image }
                  onChange={ this.inputText }
                />
              </label>
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ isDisabled }
                onClick={ () => this.handlerUser(name, email, image, description) }
              >
                Editar perfil
              </button>
            </form>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    id: PropTypes.string,
  }),
}.isRequired;
