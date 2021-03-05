import React, { useState, useEffect, useCallback } from 'react';
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import {
  Container,
  CardContainer,
  Card,
  AddTransaction,
  TableContainer,
} from './styles';
import ModalAddTransaction from '../../components/Modal';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface ICreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: { title: string };
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { data } = await api.get('transactions');

      const transactionsData = data.transactions;
      const balanceData = data.balance;

      const transactionsFormatted = transactionsData.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value, transaction.type),
          formattedDate: formatDate(transaction.created_at),
        }),
      );

      const balanceFormatted = {
        income: formatValue(balanceData.income),
        outcome: formatValue(balanceData.outcome),
        total: formatValue(balanceData.total),
      };

      setTransactions(transactionsFormatted);
      setBalance(balanceFormatted);
    }

    loadTransactions();
  }, [transactions]);

  const handleDeleteTransaction = useCallback(
    async id => {
      await api.delete(`/transactions/${id}`);

      setTransactions(
        transactions.filter(transaction => transaction.id !== id),
      );
    },
    [transactions, setTransactions],
  );

  async function handleAddTransaction(
    transaction: ICreateTransaction,
  ): Promise<void> {
    try {
      const { data } = await api.post('/transactions', { ...transaction });

      Object.assign(data, {
        formattedValue: formatValue(data.value, data.type),
        formattedDate: formatDate(data.created_at),
      });
      setTransactions([...transactions, data]);
    } catch (err) {
      console.log(err);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <Header currentPage="dashboard" />
      <ModalAddTransaction
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddTransaction={handleAddTransaction}
      />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Income</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Outcome</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Balance</p>
              <img src={total} alt="Balance" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <AddTransaction type="button" onClick={toggleModal}>
          <p>Add transaction</p>
          <FaPlusCircle />
        </AddTransaction>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>
                    {transaction.formattedDate}
                    <button
                      type="button"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
