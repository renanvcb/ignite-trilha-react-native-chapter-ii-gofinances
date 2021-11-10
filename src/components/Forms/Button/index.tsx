import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  ButtonText,
} from './styles';

interface IProps extends RectButtonProps {
  text: string;
  onPress: () => void;
}

export function Button({ text, onPress, ...rest }: IProps) {
  return (
    <Container onPress={onPress} {...rest}>
      <ButtonText>{text}</ButtonText>
    </Container>
  );
}