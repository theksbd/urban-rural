import { Box, Button, Modal } from '@mui/material';
import { getPreciseDistance } from 'geolib';
import { useRef, useState } from 'react';
import { cities } from '../data/city.js';
import '../styles/Home.css';
import City from './City.jsx';
import * as xlsx from 'xlsx';

const Home = () => {
  const [cityDetail, setCityDetail] = useState({});
  const [search, setSearch] = useState('');
  const inputSearch = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [nearestCity, setNearestCity] = useState('');
  const [importedLocations, setImportedLocations] = useState([]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  const handleChangeSearch = e => {
    setSearch(e.target.value);
  };

  const handleChangeLatitude = e => {
    setLatitude(e.target.value);
  };

  const handleChangeLongitude = e => {
    setLongitude(e.target.value);
  };

  const handleClickCity = city => {
    setShowModal(true);
    setCityDetail(city);
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    if (latitude.trim() === '' || longitude.trim() === '') {
      alert('Please enter latitude and longitude');
      return;
    }

    // Calculate the distance from the entered latitude and longitude to the nearest city
    const newCities = cities.map(city => {
      const distance = getPreciseDistance(
        { latitude, longitude },
        { latitude: city.latitude, longitude: city.longitude }
      );

      return { ...city, distance };
    });

    // Sort the cities by distance
    const newSortedCities = newCities.sort((a, b) => a.distance - b.distance);

    // Get the nearest city
    const nearestCity = newSortedCities[0];

    // Show the nearest city
    setNearestCity(nearestCity);
  };

  const readUploadFile = e => {
    e.preventDefault();

    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = e => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);

        setImportedLocations(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div className='cities'>
      <h1>CITIES</h1>

      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search city by name'
          onChange={handleChangeSearch}
          value={search}
          ref={inputSearch}
        />
      </div>

      <div className='custom-location'>
        <form className='form' onSubmit={handleSubmitForm}>
          <input
            type='text'
            placeholder='Latitude'
            onChange={handleChangeLatitude}
            value={latitude}
          />
          <input
            type='text'
            placeholder='Longitude'
            onChange={handleChangeLongitude}
            value={longitude}
          />

          <Button variant='outlined' type='submit' className='form-btn-submit'>
            Find the closest city
          </Button>
        </form>

        <div className='nearest-city'>
          {nearestCity ? (
            <div>
              The nearest city is <span>{nearestCity.name}</span> with a
              distance of <span>{nearestCity.distance} (m)</span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      <form className='upload-excel'>
        <label htmlFor='upload'>Upload File</label>
        <input
          type='file'
          name='upload'
          id='upload'
          onChange={readUploadFile}
        />
      </form>

      {/* Print the table of importedLocation: [{id, name, latitude, longitude}] and the nearest city of each row */}
      {importedLocations.length > 0 && (
        <div className='imported-locations'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>LATITUDE</th>
                <th>LONGITUDE</th>
                <th>NEAREST CITY</th>
              </tr>
            </thead>
            <tbody>
              {importedLocations.map((location, index) => {
                // Calculate the distance from the entered latitude and longitude to the nearest city
                const newCities = cities.map(city => {
                  const distance = getPreciseDistance(
                    {
                      latitude: location.latitude,
                      longitude: location.longitude
                    },
                    { latitude: city.latitude, longitude: city.longitude }
                  );

                  return { ...city, distance };
                });

                // Sort the cities by distance
                const newSortedCities = newCities.sort(
                  (a, b) => a.distance - b.distance
                );

                // Get the nearest city
                const nearestCity = newSortedCities[0];

                return (
                  <tr key={index}>
                    <td>{location.id}</td>
                    <td>{location.name}</td>
                    <td>{location.latitude}</td>
                    <td>{location.longitude}</td>
                    <td>
                      {nearestCity ? (
                        <div>
                          <span>{nearestCity.name}</span> with a distance of{' '}
                          <span>{nearestCity.distance} (m)</span>
                        </div>
                      ) : (
                        ''
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <h4 className='title-number-record'>
        {
          cities.filter(city =>
            city.name.trim().toLowerCase().includes(search.toLowerCase().trim())
          ).length
        }{' '}
        RECORDS BELOW
      </h4>

      <div className='cities-container'>
        {cities
          .filter(city =>
            city.name.trim().toLowerCase().includes(search.toLowerCase().trim())
          )
          .map(city => (
            <div key={city.id} className='cities-item'>
              <p onClick={() => handleClickCity(city)}>
                {city.id}. <span>{city.name}</span>
              </p>
            </div>
          ))}
      </div>

      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <City city={cityDetail} />
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
