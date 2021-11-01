import React, { useState } from 'react';
import { Button } from '../../components/Forms/Button';

import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Descrição"
          />
          <Input
            placeholder="Valor"
          />

          <TransactionTypes>
            <TransactionTypeButton
              type="income"
              text="Income"
              onPress={() => handleTransactionTypeSelect('income')}
              isSelected={transactionType === 'income'}
            />
            <TransactionTypeButton
              type="outcome"
              text="Outcome"
              onPress={() => handleTransactionTypeSelect('outcome')}
              isSelected={transactionType === 'outcome'}
            />
          </TransactionTypes>

        </Fields>
        <Button text="Enviar" />
      </Form>
    </Container>
  );
}