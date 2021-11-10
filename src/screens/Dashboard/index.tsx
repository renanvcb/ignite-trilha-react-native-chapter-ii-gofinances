import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { useTheme } from 'styled-components';

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

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
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

    const balanceCalc = incomesTotal - outcomesTotal;

    setHighlightData({
      incomes: {
        amount: incomesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
      },
      outcomes: {
        amount: outcomesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
      },
      balance: {
        amount: balanceCalc.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
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
                  <UserPhoto source={{ uri: 'https://github.com/renanvcb.png' }} />
                  <UserMessage>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>Renan</UserName>
                  </UserMessage>
                </UserInfo>
                <LogoutButton onPress={() => { }}>
                  <Icon name="power" />
                </LogoutButton>

              </UserWrapper>
            </Header>

            <HighlightCards>
              <HighlightCard
                type="up"
                title="Entradas"
                amount={highlightData.incomes.amount}
                message="Última entrada dia 13 de abril"
              />
              <HighlightCard
                type="down"
                title="Saídas"
                amount={highlightData.outcomes.amount}
                message="Última saída dia 03 de abril"
              />
              <HighlightCard
                type="total"
                title="Total"
                amount={highlightData.balance.amount}
                message="01 à 16 de abril"
              />
            </HighlightCards>

            <Transactions>
              <Title>Transações</Title>

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
