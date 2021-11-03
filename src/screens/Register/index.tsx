import React, { useState } from 'react';

import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelect } from '../../components/Forms/CategorySelect';
import { Button } from '../../components/Forms/Button';


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

          <CategorySelect title="Categoria" />

        </Fields>
        <Button text="Enviar" />
      </Form>
    </Container>
  );
}