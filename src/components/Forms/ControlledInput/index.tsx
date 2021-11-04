import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Input } from '../Input';

import { Container, ErorrMessage } from './styles';

interface IProps extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export function ControlledInput({ control, name, error, ...rest }: IProps) {
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
      {error && <ErorrMessage>{error}</ErorrMessage>}
    </Container>
  );
}