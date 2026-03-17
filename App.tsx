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

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [displayNumber, setDisplayNumber] = useState('...');
  const [, setNumber] = useState('...');
  const context = useContext(StatisticsContext)!;
  const { updateStat } = context;
  useEffect(() => {
    setDisplayNumber('...');
    setNumber('...');

    const unsubscribe = navigation.addListener('focus', () => {
      setDisplayNumber('...');
      setNumber('...');
    });

    return unsubscribe;
  }, [navigation]);


  return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Random Number Generator</Text>
        </View>
      </SafeAreaView>
  );
};


const App = (): JSX.Element => {
  return (
      <StatisticsProvider>
        <NavigationContainer>
          <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#b08968' },
              }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ statusBarStyle: 'light' }} />

          </Stack.Navigator>
        </NavigationContainer>
      </StatisticsProvider>
  );
};

export default App;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#b08968',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#7f5539',
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
  },
  backButtonContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginRight: 8,
  },
  backButton: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 32,
  },
  numberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 144,
    color: '#ffffff',
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  flatListContent: {
    padding: 24,
    alignItems: 'center',
    paddingTop: 16,
    flexGrow: 1,
  },
  statItem: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  statText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '500',
  },
  buttonRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  button: {
    backgroundColor: '#7f5539',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },
});


