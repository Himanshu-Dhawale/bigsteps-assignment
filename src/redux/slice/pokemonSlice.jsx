import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  loading: false,
  error: null,
  offset: 0,
  searchTerm: '',
  selectedType: '', // Added selectedType
};

export const fetchData = createAsyncThunk('pokemon/fetchData', async ({ offset, type }) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&type=${type}`);
    const results = response.data.results;

    const pokemonData = await Promise.all(
      results.map(async (pokemon) => {
        const detailsResponse = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          image: detailsResponse.data.sprites.front_default,
          types: detailsResponse.data.types.map((type) => type.type.name),
        };
      })
    );

    return pokemonData;
  } catch (error) {
    throw Error('An error occurred while fetching data.');
  }
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload];
        state.offset += 10;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setSelectedType } = pokemonSlice.actions;

export const selectPokemonData = (state) => state.pokemon.data;
export const selectSearchTerm = (state) => state.pokemon.searchTerm;
export const selectSelectedType = (state) => state.pokemon.selectedType;

export default pokemonSlice.reducer;
