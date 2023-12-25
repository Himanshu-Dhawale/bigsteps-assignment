import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchData,
  selectPokemonData,
  setSearchTerm,
  selectSearchTerm,
  setSelectedType,
  selectSelectedType,
} from './redux/slice/pokemonSlice';
import Card from './components/Card';

const types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectPokemonData);
  const loading = useSelector((state) => state.pokemon.loading);
  const searchTerm = useSelector(selectSearchTerm);
  const selectedType = useSelector(selectSelectedType);
  const offset = useRef(0);

  useEffect(() => {
    dispatch(fetchData({ offset: 0, type: selectedType }));
  }, [dispatch, selectedType]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleTypeChange = (e) => {
    dispatch(setSelectedType(e.target.value));
  };

  const filteredData = data.filter((item) => {
    const typeFilter = selectedType === '' || item.types.includes(selectedType);
    const nameFilter = item.name.toLowerCase().includes(searchTerm.toLowerCase());

    return typeFilter && nameFilter;
  });

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;

    const bottomOffset = 100;

    if (scrollTop + clientHeight >= scrollHeight - bottomOffset && !loading) {
      offset.current += 20;
      dispatch(fetchData({ offset: offset.current, type: selectedType }));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="App">
      <div className="fixed top-0 left-0 right-0 p-4 bg-gray-800 text-white z-10">
        <div className="flex justify-between items-center">
          <div className="search-bar flex items-center">
            
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:border-blue-500 text-gray-800"
            />
          </div>
          <div className="type-filter ml-4">
            <label htmlFor="type" className="mr-2 text-gray-300">
              Filter by Type:
            </label>
            <select
              id="type"
              value={selectedType}
              onChange={handleTypeChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-gray-800"
            >
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type} value={type} className="text-gray-800">
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <div className="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredData.map((item, idx) => (
            <Card key={idx} item={item} />
          ))}
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
