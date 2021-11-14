import React, { useContext } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSVG from '../../assets/apple.svg';
import GoogleSVG from '../../assets/google.svg';
import LogoSVG from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInText,
  Footer,
  ButtonWrapper,
} from './styles';

export function SignIn() {
  const { user } = useAuth();
  console.log(user);

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
        <ButtonWrapper>
          <SignInSocialButton
            text="Entrar com Google"
            svg={GoogleSVG}
          />
          <SignInSocialButton
            text="Entrar com Apple"
            svg={AppleSVG}
          />
        </ButtonWrapper>
      </Footer>
    </Container>
  );
}