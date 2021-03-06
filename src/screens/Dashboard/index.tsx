import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, ITransactionCardProps } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  UserPhoto,
  UserMessage,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LoadingContainer,
} from './styles';

export interface IDataListProps extends ITransactionCardProps {
  id: string;
}

interface IHighlightProps {
  amount: string;
  lastTransactionDate: string;
}

interface IHighlightData {
  incomes: IHighlightProps;
  outcomes: IHighlightProps;
  balance: IHighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IDataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightData>({} as IHighlightData);

  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: IDataListProps[],
    type: 'income' | 'outcome'
  ) {
    const collectionFiltered = collection
      .filter(transaction => transaction.type === type);

    if (collectionFiltered.length === 0) {
      return 0;
    }

    const lastTransaction = new Date(Math.max.apply(Math, collectionFiltered
      .map(transaction => new Date(transaction.date).getTime())));

    return `${lastTransaction.
      getDate()} de ${lastTransaction
        .toLocaleString('pt-BR', { month: 'long' })}`;
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let incomesTotal = 0;
    let outcomesTotal = 0;

    const formattedTransactions: IDataListProps[] = transactions
      .map((item: IDataListProps) => {
        // Generating sum of each transaction type
        if (item.type === 'income') {
          incomesTotal += Number(item.amount);
        } else {
          outcomesTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(new Date(item.date));

        return {
          id: item.id,
          description: item.description,
          amount,
          type: item.type,
          category: item.category,
          date,
        }
      });

    setData(formattedTransactions);

    const lastIncomeDate = getLastTransactionDate(transactions, 'income');
    const lastOutcomeDate = getLastTransactionDate(transactions, 'outcome');
    const balanceInterval = (lastIncomeDate === 0 && lastOutcomeDate === 0) ?
      'N??o h?? transa????es.' :
      `01 ?? ${new Date().
        getDate()} de ${new Date().
          toLocaleString('pt-BR', { month: 'long' })}`;

    // Calculating account balance
    const balanceCalc = incomesTotal - outcomesTotal;

    setHighlightData({
      incomes: {
        amount: incomesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactionDate: lastIncomeDate === 0 ?
          'N??o h?? nenhuma transa????o de entrada.' :
          `??ltima entrada dia ${lastIncomeDate}`,
      },
      outcomes: {
        amount: outcomesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactionDate: lastOutcomeDate === 0 ?
          'N??o h?? nenhuma transa????o de sa??da.' :
          `??ltima entrada dia ${lastOutcomeDate}`,
      },
      balance: {
        amount: balanceCalc.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransactionDate: balanceInterval,
      }
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
        isLoading ?
          <LoadingContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadingContainer> :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <UserPhoto source={{ uri: user.avatar }} />
                  <UserMessage>
                    <UserGreeting>Ol??,</UserGreeting>
                    <UserName>{user.name}</UserName>
                  </UserMessage>
                </UserInfo>
                <LogoutButton onPress={signOut}>
                  <Icon name="power" />
                </LogoutButton>

              </UserWrapper>
            </Header>

            <HighlightCards>
              <HighlightCard
                type="up"
                title="Entradas"
                amount={highlightData.incomes.amount}
                message={highlightData.incomes.lastTransactionDate}
              />
              <HighlightCard
                type="down"
                title="Sa??das"
                amount={highlightData.outcomes.amount}
                message={highlightData.outcomes.lastTransactionDate}
              />
              <HighlightCard
                type="total"
                title="Total"
                amount={highlightData.balance.amount}
                message={highlightData.balance.lastTransactionDate}
              />
            </HighlightCards>

            <Transactions>
              <Title>Transa????es</Title>

              <TransactionsList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />
            </Transactions>
          </>
      }
    </Container>
  );
}
