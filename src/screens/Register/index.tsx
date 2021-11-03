import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

import { ControlledInput } from '../../components/Forms/ControlledInput';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

interface IFormData {
  name: string;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [catrgoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
  } = useForm();

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type);
  }

  function handleOpenCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegisterTransaction(form: IFormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }

    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <ControlledInput
            name="name"
            control={control}
            placeholder="Descrição"
          />
          <ControlledInput
            name="amount"
            control={control}
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

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenCategoryModal}
          />

        </Fields>
        <Button
          text="Enviar"
          onPress={handleSubmit(handleRegisterTransaction)}
        />
      </Form>

      <Modal visible={catrgoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseCategoryModal}
        />
      </Modal>

    </Container>
  );
}