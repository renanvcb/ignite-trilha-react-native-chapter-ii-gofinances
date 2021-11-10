import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

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
} from './styles';

export interface IDataListProps extends ITransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<IDataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    const formattedTransactions: IDataListProps[] = transactions
      .map((item: IDataListProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
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
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  // const data: IDataListProps[] = [
  //   {
  //     id: '1',
  //     type: 'income',
  //     description: 'Desenvolvimento de site',
  //     amount: 'R$ 12.000,00',
  //     category: {
  //       name: 'Vendas',
  //       icon: 'dollar-sign',
  //     },
  //     date: '13/04/2020'
  //   },
  // ];

  return (
    <Container>
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
        <HighlightCard type="up" title="Entradas" amount="R$ 17.400,00" message="Última entrada dia 13 de abril" />
        <HighlightCard type="down" title="Saídas" amount="R$ 1.259,00" message="Última saída dia 03 de abril" />
        <HighlightCard type="total" title="Total" amount="R$ 16.141,00" message="01 à 16 de abril" />
      </HighlightCards>

      <Transactions>
        <Title>Transações</Title>

        <TransactionsList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
