import React, { useState } from 'react';
import { Modal, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

const schema = yup.object().shape({
  name: yup.string().required('Uma descrição é obrigatória'),
  amount: yup.number()
    .required('O valor é obrigatório')
    .typeError('Somente valores numéricos')
    .positive('Somente valores maiores que zero')
});

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type);
    Keyboard.dismiss();
  }

  function handleOpenCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleRegisterTransaction(form: IFormData) {
    if (!transactionType) {
      return Alert.alert('Selecione um tipo de transação!');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione uma categoria!');
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }

    console.log(data);
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && '* ' + errors.name.message}
            />
            <ControlledInput
              name="amount"
              control={control}
              placeholder="Valor"
              keyboardType="numeric"
              error={errors.amount && '* ' + errors.amount.message}
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
    </TouchableWithoutFeedback>
  );
}