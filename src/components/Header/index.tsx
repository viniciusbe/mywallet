import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo_mywallet.svg';

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
      <div>
        <img src={Logo} alt="GoFinances" />
        <div>
          Icon made by{' '}
          <a
            href="https://www.flaticon.com/authors/those-icons"
            title="Those Icons"
          >
            Those Icons
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
      <nav>
        <Link
          to="/"
          style={
            currentPage === 'dashboard'
              ? { borderBottom: '2px solid #00adb5' }
              : { opacity: '0.6' }
          }
        >
          Account
        </Link>
        <Link
          to="/import"
          style={
            currentPage === 'import'
              ? { borderBottom: '2px solid #00adb5' }
              : { opacity: '0.6' }
          }
        >
          Import
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
