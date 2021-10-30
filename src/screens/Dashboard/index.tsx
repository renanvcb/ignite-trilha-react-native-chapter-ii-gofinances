import React from 'react';


import { HighlightCard } from '../../components/HighlightCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  UserPhoto,
  UserMessage,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
} from './styles';

export function Dashboard() {
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
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCards>
    </Container>
  );
}
