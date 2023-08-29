import '../styles/City.css';
import PropTypes from 'prop-types';

const City = ({ city: { id, name, latitude, longitude } }) => {
  return (
    <div className='modal'>
      <h1>{name.toUpperCase()}</h1>
      <h3>ID: {id}</h3>
      <h3>
        Latitude and Longitude: {latitude}, {longitude}
      </h3>
      <div className='links links-grid'>Hello</div>
    </div>
  );
};

City.propTypes = {
  city: PropTypes.object.isRequired
};

export default City;
