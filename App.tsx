import React, {useState, useContext, createContext, useCallback, useEffect, JSX} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';

import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const StatisticsContext = createContext<{
  stats: number[];
  updateStat: (num: number) => void;
  clearStats: () => void;
} | null>(null);

const StatisticsProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [stats, setStats] = useState<number[]>(Array(9).fill(0));

  const updateStat = useCallback((num: number) => {
    setStats(prev => {
      const updated = [...prev];
      updated[num - 1] += 1;
      return updated;
    });
  }, []);

  const clearStats = useCallback(() => {
    setStats(Array(9).fill(0));
  }, []);

  return (
      <StatisticsContext.Provider value={{ stats, updateStat, clearStats }}>
        {children}
      </StatisticsContext.Provider>
  );
};

