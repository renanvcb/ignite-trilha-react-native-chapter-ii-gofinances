import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface ITypeProps {
  type: 'income' | 'outcome';
};

interface IButtonProps {
  isSelected: boolean;
  type: 'income' | 'outcome';
}

export const Container = styled(RectButton) <IButtonProps>`
  width: 48%;
  
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-width: ${({ isSelected }) => isSelected ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  padding: 16px;

  ${({ isSelected, type }) => isSelected && type === 'income' && css`
      background-color: ${({ theme }) => theme.colors.success_light};
  `};

  ${({ isSelected, type }) => isSelected && type === 'outcome' && css`
      background-color: ${({ theme }) => theme.colors.attention_light};
  `};
`;

export const Icon = styled(Feather) <ITypeProps>`
  font-size: ${RFValue(24)}px;

  color: ${({ theme, type }) =>
    type === 'income' ? theme.colors.success : theme.colors.attention};

  margin-right: 14px;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;
