import React, { useState, useEffect } from 'react';
import { Modal, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { ControlledInput } from '../../components/Forms/ControlledInput';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

interface IFormData {
  description: string;
  amount: string;
}

interface NavigationProps {
  navigate: (screen: string) => void;
}

const schema = yup.object().shape({
  description: yup.string().required('Uma descrição é obrigatória'),
  amount: yup.number()
    .required('O valor é obrigatório')
    .typeError('Somente valores numéricos')
    .positive('Somente valores maiores que zero'),
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [catrgoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<NavigationProps>();

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

  async function handleRegisterTransaction(form: IFormData) {
    if (!transactionType) {
      return Alert.alert('Selecione um tipo de transação!');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione uma categoria!');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      description: form.description,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const asyncStorageData = await AsyncStorage.getItem(dataKey);
      const currentData = asyncStorageData ? JSON.parse(asyncStorageData) : [];

      const formattedData = [
        ...currentData,
        newTransaction,
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

      // Reset form fields
      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigation.navigate('Listagem');

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível registrar a transação');
    }

    Keyboard.dismiss();
  }

  // useEffect(() => {
  //   // async function loadAsyncStorageData() {
  //   //   const data = await AsyncStorage.getItem(dataKey);
  //   //   console.log(JSON.parse(data!));
  //   // }

  //   // loadAsyncStorageData();

  //   // async function clearAsyncStorageData() {
  //   //   await AsyncStorage.removeItem(`@gofinances:transactions_user:${user.id}`);
  //   // }

  //   // clearAsyncStorageData();
  // }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <ControlledInput
              name="description"
              control={control}
              placeholder="Descrição"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.description && '* ' + errors.description.message}
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