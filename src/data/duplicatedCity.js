import { cities } from './city.js';

const citiesName = cities.map(city => city.name);

const duplicatedCity = citiesName.filter(
  (name, index) => citiesName.indexOf(name) !== index
);

console.log(duplicatedCity);
