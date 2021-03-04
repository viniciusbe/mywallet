import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  currentPage: 'dashboard' | 'import';
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  currentPage,
}: HeaderProps) => (
  <Container size={size} currentPage={currentPage}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link
          to="/"
          style={
            currentPage === 'dashboard'
              ? { borderBottom: '2px solid #ff872c' }
              : { opacity: '0.6' }
          }
        >
          Listagem
        </Link>
        <Link
          to="/import"
          style={
            currentPage === 'import'
              ? { borderBottom: '2px solid #ff872c' }
              : { opacity: '0.6' }
          }
        >
          Importar
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
