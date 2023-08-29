import { Box, Modal } from '@mui/material';
import { useRef, useState } from 'react';
import { cities } from '../data/city.js';
import '../styles/Home.css';
import City from './City.jsx';

const Home = () => {
  const [cityDetail, setCityDetail] = useState({});
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const inputSearch = useRef(null);

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

  const handleClickCity = city => {
    setShowModal(true);
    setCityDetail(city);
  };

  return (
    <div className='cities'>
      <h1>CITIES</h1>

      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search'
          onChange={handleChangeSearch}
          value={search}
          ref={inputSearch}
        />
      </div>

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
