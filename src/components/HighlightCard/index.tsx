import React from 'react';

import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Ammount,
  Message,
} from './styles';

export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Title>Entradas</Title>
        <Icon name="arrow-up-circle" />
      </Header>

      <Content>
        <Ammount>R$ 17.400,00</Ammount>
        <Message>Última entrada dia 13 de abril</Message>
      </Content>
    </Container>
  );
}