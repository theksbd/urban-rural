import '../styles/City.css';
import PropTypes from 'prop-types';
import { cities } from '../data/city.js';
import { getPreciseDistance } from 'geolib';

const City = ({ city: { id, name, latitude, longitude } }) => {
  return (
    <div className='modal'>
      <h1>{name.toUpperCase()}</h1>
      <h3>ID: {id}</h3>
      <h3>
        Latitude and Longitude: {latitude}, {longitude}
      </h3>
      <div className='grid'>
        {cities
          .filter(city => city.id !== id)
          .map(city => {
            const distance = getPreciseDistance(
              { latitude, longitude },
              { latitude: city.latitude, longitude: city.longitude }
            );

            return { ...city, distance };
          })
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 10)
          .map(city => {
            return (
              <div key={city.id}>
                <p>
                  Distance to <span>{city.name}</span>: {city.distance} (m)
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

City.propTypes = {
  city: PropTypes.object.isRequired
};

export default City;
