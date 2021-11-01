import React from 'react';
import { Button } from '../../components/Forms/Button';

import { Input } from '../../components/Forms/Input';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
} from './styles';

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input
            placeholder="Descrição"
          />
          <Input
            placeholder="Valor"
          />
        </Fields>
        <Button text="Enviar" />
      </Form>
    </Container>
  );
}