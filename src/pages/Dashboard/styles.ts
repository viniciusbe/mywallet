import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;

  @media handheld and (max-width: 360px) {
    overflow: scroll;
  }

  @media screen and (max-width: 888px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 584px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: ${({ total }: CardProps): string => (total ? '#00adb5' : '#eee')};
  padding: 22px 32px;
  border-radius: 5px;
  color: ${({ total }: CardProps): string => (total ? '#eee' : '#363F5F')};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;

export const AddTransaction = styled.button`
  margin: 2rem 0 1.5rem auto;
  border: 0;
  color: #222831;
  background-color: #12a454;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 8px;

  p {
    margin-right: 8px;
  }
`;

export const TableContainer = styled.section`
  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 0 32px 8px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;

      &:last-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &:last-child,
      &:nth-child(3) {
        @media (max-width: 635px) {
          display: none;
        }
      }
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #eee;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      &:nth-child(2) {
        @media (max-width: 635px) {
          border-radius: 0 8px 8px 0;
        }
      }

      &:last-child,
      &:nth-child(3) {
        @media (max-width: 635px) {
          display: none;
        }
      }

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        margin-left: 16px;
        border: 0;
        color: #e83f5b;
      }

      @media (max-width: 635px) {
        display: none;
      }
    }
  }
`;
