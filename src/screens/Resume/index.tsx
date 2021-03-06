import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useTheme } from 'styled-components/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import {
  Container,
  LoadingContainer,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
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
  const [isLoading, setIsLoading] = useState(false);
  const [totalByCategory, setTotalByCategory] = useState<ICategoryProps[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const theme = useTheme();
  const { user } = useAuth();

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const asyncStorageData = await AsyncStorage.getItem(dataKey);
    const currentData = asyncStorageData ? JSON.parse(asyncStorageData) : [];

    const outcomes: ITransacionProps[] = currentData
      .filter((outcome: ITransacionProps) =>
        outcome.type === 'outcome' &&
        new Date(outcome.date).getMonth() === selectedDate.getMonth() &&
        new Date(outcome.date).getUTCFullYear() === selectedDate.getUTCFullYear()
      );


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
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]));

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ?
        <LoadingContainer>
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
          />
        </LoadingContainer> :

        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight() - 60,
          }}
        >

          <MonthSelect>
            <MonthSelectButton onPress={() => { handleDateChange('prev') }}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => { handleDateChange('next') }}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

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
      }
    </Container>
  );
}