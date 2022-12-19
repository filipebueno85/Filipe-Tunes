import React from 'react';
import loadingGif from '../assets/Spinner-1s-200px (1).gif';

class Carregando extends React.Component {
  render() {
    return (
      <div className="loading">
        <img className="load-gif" src={ loadingGif } alt="..." />
      </div>
    );
  }
}

export default Carregando;
