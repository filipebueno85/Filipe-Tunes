import PropTypes from 'prop-types';
import React from 'react';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    isDisabled: true,
    loading: false,
  };

  inputText = ({ target }) => {
    const tres = 3;
    const { value, name } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (value.length >= tres) {
          this.setState({
            isDisabled: false,
          });
        }
      },
    );
  };

  handleClick = () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name });
      history.push('/search');
    });
  };

  render() {
    const { isDisabled, loading } = this.state;

    if (loading) {
      return (<Carregando />);
    }
    return (
      <div className="login-page" data-testid="page-login">
        <h2>Digite seu Nome:</h2>
        <form>
          <input
            name="name"
            data-testid="login-name-input"
            onChange={ this.inputText }
            type="text"
          />
          <button
            onClick={ this.handleClick }
            data-testid="login-submit-button"
            type="button"
            disabled={ isDisabled }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
