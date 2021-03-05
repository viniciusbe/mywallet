import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
  currentPage: 'dashboard' | 'import';
}

export const Container = styled.div<ContainerProps>`
  background: #393e46;
  padding: 30px 0;
  width: 100%;
  display: flex;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 543px) {
      div:first-child {
        margin-bottom: 32px;
      }
    }

    div:first-child {
      text-decoration: none;
      margin-right: 32px;
      max-width: 300px;
      font-size: 0.8rem;

      a {
        text-decoration: none;
        color: #00adb5;
      }
    }

    nav {
      a {
        color: #eeeeee;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;
        padding-bottom: 10px;

        & + a {
          margin-left: 32px;
        }
      }
    }
  }
`;
