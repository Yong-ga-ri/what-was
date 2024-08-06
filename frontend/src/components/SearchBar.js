import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import axios from 'axios';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f0f0f0;
`;

const MyTextField = styled(TextField)`

  margin-right: 10px;
`;

const MyButton = styled(Button)`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;

const SearchBar = () => {
  const [query, setQuery] = useState('');
    
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('requested');

    try {
      // const response = await axios.get('localhost:3001/api/search?type=keyword', { 'msg': query });
      const response = await axios.get('localhost:3001/api/ask/keyword', { 'msg': query });
      
      console.log("response:", response.data);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <SearchBarContainer>
      <MyTextField
        variant="outlined"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <MyButton
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
      >
        Search
      </MyButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
