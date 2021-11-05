import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Button,
  Icon,
  ButtonText,
} from './styles';

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
};

interface IProps extends RectButtonProps {
  type: 'income' | 'outcome';
  text: string;
  isSelected: boolean;
};

export function TransactionTypeButton({
  type,
  text,
  isSelected,
  ...rest
}: IProps) {
  return (
    <Container
      isSelected={isSelected}
      type={type}
    >
      <Button
        {...rest}
      >
        <Icon
          name={icons[type]}
          type={type}
        />
        <ButtonText>
          {text}
        </ButtonText>
      </Button>
    </Container>
  );
}