import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Input } from '../Input';

import { Container } from './styles';

interface IProps extends TextInputProps {
  control: Control;
  name: string;
}

export function ControlledInput({ control, name, ...rest }: IProps) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
    </Container>
  );
}