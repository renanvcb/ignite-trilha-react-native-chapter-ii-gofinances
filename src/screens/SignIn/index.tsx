import React, { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSVG from '../../assets/apple.svg';
import GoogleSVG from '../../assets/google.svg';
import LogoSVG from '../../assets/logo.svg';

import { useTheme } from 'styled-components/native';
import { useAuth } from '../../hooks/auth';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInText,
  Footer,
  Load,
  ButtonWrapper,
} from './styles';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar à conta Google!');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar à conta Apple!');
      setIsLoading(false);
    }
  }

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
            onPress={handleSignInWithGoogle}
          />
          {
            Platform.OS === 'ios' &&
            <SignInSocialButton
              text="Entrar com Apple"
              svg={AppleSVG}
              onPress={handleSignInWithApple}
            />
          }
        </ButtonWrapper>

        {isLoading &&
          <Load
            color={theme.colors.shape}
            style={{
              marginTop: 18,
            }}
          />
        }
      </Footer>
    </Container>
  );
}