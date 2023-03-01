import React from 'react';
import Spinner from '../../reuseables/spinner/Spinner';


export default () => {
  return (
    <div
      className="ag-overlay-loading-center"
      style={{  height: '9%' }}
    >
      <i className="fas fa-hourglass-half"> <Spinner /> </i>
    </div>
  );
};