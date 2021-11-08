import React from 'react';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

interface ICategoryProps {
  name: string;
  icon: string;
}

export interface ITransactionCardProps {
  type: 'income' | 'outcome';
  description: string;
  amount: string;
  category: ICategoryProps;
  date: string;
}

interface ITypeProps {
  data: ITransactionCardProps
}

export function TransactionCard({ data }: ITypeProps) {
  return (
    <Container>
      <Title>{data.description}</Title>
      <Amount type={data.type}>
        {data.type === 'outcome' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}