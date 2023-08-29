import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import { useEffect, useRef, useState } from 'react';
import { models as ALL_MODELS } from '../data/city.js';
import '../styles/Models.css';
import Model from './Model.jsx';

function Models() {
  const [models, setModels] = useState(ALL_MODELS);
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [output, setOutput] = useState('');
  const [showModalSummary, setShowModalSummary] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modelDetail, setModelDetail] = useState({});
  const [option, setOption] = useState('-1');
  const inputSearch = useRef(null);

  const modelsWith0Image = ALL_MODELS.filter(
    model => model.numberOfImages === 0
  );

  const modelsWith1Image = ALL_MODELS.filter(
    model => model.numberOfImages === 1
  );

  const modelsWith2Images = ALL_MODELS.filter(
    model => model.numberOfImages === 2
  );

  const modelsWith3Images = ALL_MODELS.filter(
    model => model.numberOfImages === 3
  );

  const modelsWith4Images = ALL_MODELS.filter(
    model => model.numberOfImages === 4
  );

  const modelsWith5Images = ALL_MODELS.filter(
    model => model.numberOfImages === 5
  );

  const modelsWith6Images = ALL_MODELS.filter(
    model => model.numberOfImages === 6
  );

  const modelsWith7Images = ALL_MODELS.filter(
    model => model.numberOfImages === 7
  );

  const modelsWith8Images = ALL_MODELS.filter(
    model => model.numberOfImages === 8
  );

  const modelsWith9Images = ALL_MODELS.filter(
    model => model.numberOfImages === 9
  );

  const modelsWith10Images = ALL_MODELS.filter(
    model => model.numberOfImages === 10
  );

  const modelsWith11Images = ALL_MODELS.filter(
    model => model.numberOfImages === 11
  );

  const modelsWith12Images = ALL_MODELS.filter(
    model => model.numberOfImages === 12
  );

  const allKindsOfModels = [
    modelsWith0Image,
    modelsWith1Image,
    modelsWith2Images,
    modelsWith3Images,
    modelsWith4Images,
    modelsWith5Images,
    modelsWith6Images,
    modelsWith7Images,
    modelsWith8Images,
    modelsWith9Images,
    modelsWith10Images,
    modelsWith11Images,
    modelsWith12Images
  ];

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

  const formatName = modelName => {
    const names = modelName.split(' ');
    const newNames = names.map(word => {
      return word.at(0).toUpperCase() + word.slice(1);
    });
    return newNames.join(' ');
  };

  const sort = (a, b) => a - b;

  const handleChangeOutput = () => {
    let result = 's-';
    list.sort(sort).forEach(id => {
      result += `${id}-`;
    });
    result += 'e';
    setOutput(result);
  };

  const handleChangeSearch = e => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleClickAdd = id => {
    setList([...list, id]);
    setSearch('');
    inputSearch.current.focus();
  };

  const handleClickRemove = id => {
    setList(list.filter(item => item !== id));
    inputSearch.current.focus();
  };

  const handleClickModel = model => {
    setShowModal(true);
    setModelDetail(model);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModalSummary = () => {
    setShowModalSummary(false);
  };

  const handleChangeDropdown = e => {
    setOption(e.target.value);
  };

  const handleClickReset = () => {
    setSearch('');
    setOption('-1');
  };

  const handleClickResetAll = () => {
    setSearch('');
    setList([]);
    setOption('-1');
  };

  useEffect(() => {
    handleChangeOutput();
  }, [list]);

  useEffect(() => {
    if (option === '-1') {
      setModels(ALL_MODELS);
    } else {
      setModels(allKindsOfModels[option]);
    }
  }, [option]);

  return (
    <div className='models'>
      <h1>MODELS</h1>
      <div className='features'>
        <Button
          variant='outlined'
          color='success'
          className='btn-summary'
          onClick={() => setShowModalSummary(true)}
        >
          SUMMARY
        </Button>
        <Button
          variant='contained'
          color='success'
          className='btn-reset-all'
          onClick={() => handleClickResetAll()}
        >
          RESET ALL
        </Button>
      </div>

      <div className='output'>
        <h3 className='output-text'>
          {output.length >= 50 ? `...${output.slice(-50)}` : `${output}`}
        </h3>
      </div>

      <div className='list-container'>
        <h2>SELECTED MODELS</h2>
        <div className='list'>
          {list.map(id => (
            <div key={id} className='list-item'>
              <p onClick={() => handleClickModel(ALL_MODELS[id - 1])}>
                {id}. <span>{formatName(ALL_MODELS[id - 1].name)}</span>{' '}
              </p>
              <button
                className='btn-remove'
                onClick={() => handleClickRemove(id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search'
          onChange={handleChangeSearch}
          value={search}
          ref={inputSearch}
        />
        <FormControl sx={{ m: 1, minWidth: 80 }} className='dropdown'>
          <InputLabel id='demo-simple-select-label' className='dropdown'>
            Images
          </InputLabel>
          <Select
            labelId='demo-simple-select-autowidth-label'
            id='demo-simple-select-autowidth'
            autoWidth
            label='Images'
            value={option}
            onChange={handleChangeDropdown}
          >
            <MenuItem value={'-1'}>All</MenuItem>
            <MenuItem value={'0'}>0</MenuItem>
            <MenuItem value={'1'}>1</MenuItem>
            <MenuItem value={'2'}>2</MenuItem>
            <MenuItem value={'3'}>3</MenuItem>
            <MenuItem value={'4'}>4</MenuItem>
            <MenuItem value={'5'}>5</MenuItem>
            <MenuItem value={'6'}>6</MenuItem>
            <MenuItem value={'7'}>7</MenuItem>
            <MenuItem value={'8'}>8</MenuItem>
            <MenuItem value={'9'}>9</MenuItem>
            <MenuItem value={'10'}>10</MenuItem>
            <MenuItem value={'11'}>11</MenuItem>
            <MenuItem value={'12'}>12</MenuItem>
          </Select>
        </FormControl>
        <Button
          className='btn-reset'
          variant='contained'
          color='success'
          onClick={() => handleClickReset()}
        >
          RESET
        </Button>
      </div>

      <h4 className='title-number-record'>
        {
          models.filter(model =>
            model.name.trim().toLowerCase().includes(search.trim())
          ).length
        }{' '}
        RECORDS BELOW
      </h4>

      <div className='models-container'>
        {models
          .filter(model =>
            model.name.trim().toLowerCase().includes(search.trim())
          )
          .map(model => (
            <div key={model.id} className='models-item'>
              <p onClick={() => handleClickModel(model)}>
                {model.id}. <span>{formatName(model.name)}</span>
              </p>
              <button
                className={list.includes(model.id) ? 'btn-disabled' : 'btn-add'}
                disabled={list.includes(model.id)}
                onClick={() => handleClickAdd(model.id)}
              >
                Add
              </button>
            </div>
          ))}
      </div>

      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Model model={modelDetail} />
        </Box>
      </Modal>

      <Modal
        open={showModalSummary}
        onClose={handleCloseModalSummary}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h1>SUMMARY</h1>
          <h3 className='modal-summary-total'>
            THERE ARE TOTALLY {ALL_MODELS.length} MODELS IN DATA
          </h3>
          <ul>
            {allKindsOfModels.map((models, index) => {
              return (
                <li key={index}>
                  Models with {index} images: {models.length}
                </li>
              );
            })}
          </ul>
          <p className='modal-summary-sum'>
            WE HAVE A TOTAL OF{' '}
            {allKindsOfModels.reduce(
              (totalLength, currentModels) =>
                totalLength + currentModels.length,
              0
            )}{' '}
            MODELS ON THE ABOVE LIST
          </p>
        </Box>
      </Modal>
    </div>
  );
}

export default Models;
