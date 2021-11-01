import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  ButtonText,
} from './styles';

interface IProps extends TouchableOpacityProps {
  text: string;
}

export function Button({ text, ...rest }: IProps) {
  return (
    <Container {...rest}>
      <ButtonText>{text}</ButtonText>
    </Container>
  );
}