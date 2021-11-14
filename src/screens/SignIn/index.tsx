import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSVG from '../../assets/apple.svg';
import GoogleSVG from '../../assets/google.svg';
import LogoSVG from '../../assets/logo.svg';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInText,
  Footer,
} from './styles';

export function SignIn() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG
            height={RFValue(68)}
            width={RFValue(120)}
          />

          <Title>
            Controle suas{'\n'}
            finanças de forma{'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInText>
          Faça seu login com{'\n'}
          uma das contas abaixo
        </SignInText>
      </Header>

      <Footer>

      </Footer>
    </Container>
  );
}