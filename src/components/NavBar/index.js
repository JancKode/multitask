import React from 'react';
import styled from 'styled-components';

import { LogoutButton } from '@nostack/no-stack';
import logo from '../../assets/Multilogo.png'

// change styling here
const Wrapper = styled.div`
  left: 0;
  top: 0;
  padding: 1em 3em;
  font-size: 1rem;
  color: #fffff0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBar = () => (
  <Wrapper>
    <div><img src={logo}/></div>
    <div>
      <p style={{fontSize:'.9rem', color: 'black'}}>LOGOUT</p>
    </div>
  </Wrapper>
);

export default NavBar;
