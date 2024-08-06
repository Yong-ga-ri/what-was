import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #282c34;
  padding: 20px;
  box-sizing: border-box;
  color: white;
`;

const SidebarItem = styled.div`
  margin: 15px 0;
  cursor: pointer;
  &:hover {
    background-color: #3c4049;
    border-radius: 5px;
    padding: 10px;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarItem>Home</SidebarItem>
      <SidebarItem>About</SidebarItem>
      <SidebarItem>Contact</SidebarItem>
      <SidebarItem>Services</SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
