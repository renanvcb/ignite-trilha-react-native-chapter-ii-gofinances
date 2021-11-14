import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import {
  Button,
  ImageContainer,
  ButtonText,
} from './styles';

interface IProps extends RectButtonProps {
  text: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({
  text,
  svg: Svg,
  ...rest
}: IProps) {
  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <ButtonText>
        {text}
      </ButtonText>
    </Button>
  );
}