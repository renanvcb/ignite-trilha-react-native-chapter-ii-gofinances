import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components/native';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
} from './styles';

interface ITransacionProps {
  type: 'income' | 'outcome';
  description: string;
  amount: string;
  category: string;
  date: string;
}

interface ICategoryProps {
  key: string;
  name: string;
  total: number;
  formatedTotal: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [totalByCategory, setTotalByCategory] = useState<ICategoryProps[]>([]);

  const theme = useTheme();

  async function loadData() {
    const dataKey = '@gofinances:transactions';
    const asyncStorageData = await AsyncStorage.getItem(dataKey);
    const currentData = asyncStorageData ? JSON.parse(asyncStorageData) : [];

    const outcomes: ITransacionProps[] = currentData
      .filter((outcome: ITransacionProps) => outcome.type === 'outcome');

    const outcomesTotal = outcomes
      .reduce((acumulator: number, outcome: ITransacionProps) => {
        return acumulator + Number(outcome.amount);
      }, 0);

    const totalByCategory: ICategoryProps[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      outcomes.forEach(outcome => {
        if (outcome.category === category.key) {
          categorySum += Number(outcome.amount);
        }
      });

      if (categorySum > 0) {
        const formatedTotal = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${(categorySum / outcomesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          formatedTotal,
          percent,
        });
      }
    });

    setTotalByCategory(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        <ChartContainer>
          <VictoryPie
            data={totalByCategory}
            colorScale={totalByCategory.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              }
            }}
            labelRadius={70}
            x="percent"
            y="total"
          />
        </ChartContainer>
        {
          totalByCategory.map(item => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.formatedTotal}
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  );
}