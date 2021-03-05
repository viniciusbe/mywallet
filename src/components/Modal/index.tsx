import React, { useState, useEffect, useCallback, useRef } from 'react';

import ReactModal from 'react-modal';
import { FaCheckSquare } from 'react-icons/fa';
import { FormHandles } from '@unform/core';

import { Form, RadioContainer } from './styles';
import Input from '../Input';
import RadioInput from '../RadioInput';

interface ICreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: { title: string };
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddTransaction: (transaction: ICreateTransaction) => void;
}

interface RadioOption {
  id: string;
  value: string;
  label: string;
}

const ModalAddTransaction: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddTransaction,
}: IModalProps) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  const radioOptions: RadioOption[] = [
    { id: 'income', value: 'income', label: 'Income' },
    { id: 'outcome', value: 'outcome', label: 'Outcome' },
  ];

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateTransaction) => {
      console.log(data);
      handleAddTransaction({ ...data });
      setIsOpen();
    },
    [handleAddTransaction, setIsOpen],
  );

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#222831',
          color: '#eeeeee',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>New transaction</h1>

        <Input name="title" placeholder="Ex: Loan" required />
        <Input name="value" placeholder="Ex: 19.90" required />

        <Input
          name="category"
          placeholder="Ex: Food, leisure, others"
          required
        />

        <RadioContainer>
          <RadioInput name="type" options={radioOptions} required />
        </RadioContainer>

        <button type="submit" data-testid="add-food-button">
          <p className="text">Add transaction</p>
          <div className="icon">
            <FaCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </ReactModal>
  );
};

export default ModalAddTransaction;
