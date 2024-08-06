import React from 'react';
import SideBar from './components/Sidebar';
import SearchBar from './components/SearchBar';
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
  return (
    <AppContainer>
      <SideBar />
      <Content>
        <SearchBar />
      </Content>
    </AppContainer>
  );
}

export default App;
