import React, { useState } from 'react';
import { TextField, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
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

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState('keyword');
    
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('requested');
    console.log("searchMode: ", searchMode);

    try {
      // const response = await axios.get('localhost:3001/api/search?type=keyword', { 'msg': query });
      const response = await axios.get(`http://localhost:3001/api/ask/${searchMode}`);
      onSearch(response.data.result_msg);
      console.log("response:", response.data.result_msg[0]);
      console.log("requestType:", response.data.request_type);
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <SearchBarContainer>
      <ToggleButtonGroup
        value={searchMode}
        exclusive={true}
        onChange={(e, newMode) => setSearchMode(newMode)}
        aria-label="search mode"
      >
        <ToggleButton value="keyword" aria-label="keyword search">
          keyword Search
        </ToggleButton>
        <ToggleButton value="idiom" aria-label="idiom search">
          Idiom Search
        </ToggleButton>
      </ToggleButtonGroup>
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
