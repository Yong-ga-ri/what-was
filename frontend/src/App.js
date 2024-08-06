import React, {useState} from 'react';
import SideBar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import styled from 'styled-components';

const AppContainer = styled.div`
display: flex;
height: 100vh;
`;

const Content = styled.div`
flex: 1;
display: flex;
flex-direction: column;
`;

function App() {
  const [results, setResults] = useState([]);
  const handleSearch = (data) => {
    setResults(data); // 검색 결과를 상태에 저장
  };
  return (
    <AppContainer>
      <SideBar />
      <Content>
        <SearchBar onSearch={handleSearch} />
        <SearchResults results={results} />
      </Content>
    </AppContainer>
  );
}

export default App;
