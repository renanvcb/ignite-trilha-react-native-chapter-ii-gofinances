import React from 'react';

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
  const data: IDataListProps[] = [
    {
      id: '1',
      type: 'credit',
      description: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date: '13/04/2020'
    },
    {
      id: '2',
      type: 'debit',
      description: 'Hamburgueria Pizzy',
      amount: 'R$ 59,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee',
      },
      date: '10/04/2020'
    },
    {
      id: '3',
      type: 'debit',
      description: 'Aluguel do apartamento',
      amount: 'R$ 900.00',
      category: {
        name: 'Moradia',
        icon: 'home',
      },
      date: '13/04/2020'
    },
  ];

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
