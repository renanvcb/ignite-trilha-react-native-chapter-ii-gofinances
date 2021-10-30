import React from 'react';

import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  Message,
} from './styles';

interface IProps {
  type: 'up' | 'down' | 'total';
  title: string;
  amount: string;
  message: string;
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign',
}

export function HighlightCard({ type, title, amount, message }: IProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Content>
        <Amount type={type}>{amount}</Amount>
        <Message type={type}>{message}</Message>
      </Content>
    </Container>
  );
}