/*
PROG 20261 ASSIGNMENT 2
Ethan Gunawan
991789737
Project setup commands:
cd {folder I put it in}
npx create-expo-app Assignment2 --template blank-typescript
cd Assignment2
npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
Links used:
https://www.google.com/search?q=how+do+i+make+a+font+bold+inreact+native&oq=how+do+i+make+a+font+bold+inreact+native&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yDQgCEAAYhgMYgAQYigUyBwgDEAAY7wUyCggEEAAYogQYiQUyBwgFEAAY7wXSAQg0MzU1ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8
Week 9 material
Week 8 material
https://www.perplexity.ai/search/how-do-i-set-uiview-controller-D13doJmMQHmYAE7wxYJyVA 
*/
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
const Stack = createNativeStackNavigator();
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
  const generateNumber = useCallback(() => {
    const finalNum = Math.floor(Math.random() * 9) + 1;
    setNumber(finalNum.toString());
    updateStat(finalNum);
    const spinDuration = 800;
    const stepDuration = 50;
    const steps = spinDuration / stepDuration;
    let currentStep = 0;
    const spinInterval = setInterval(() => {
      currentStep++;
      const fakeNum = Math.floor(Math.random() * 9) + 1;
      setDisplayNumber(fakeNum.toString());
      if (currentStep >= steps) {
        clearInterval(spinInterval);
        setDisplayNumber(finalNum.toString());
      }
    }, stepDuration);
  }, [updateStat]);
  return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Random Number Generator</Text>
          </View>
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>{displayNumber}</Text>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={generateNumber}
            >
              <Text style={styles.buttonText}>Generate</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Stats')}
            >
              <Text style={styles.buttonText}>View Statistics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
  );
};
const StatsScreen = ({ navigation }: { navigation: any }) => {
  const context = useContext(StatisticsContext)!;
  const { stats, clearStats } = context;
  const data = stats.map((count: number, i: number) => ({
    key: (i + 1).toString(),
    label: `Number ${i + 1}: ${count} times`,
  }));
  return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButtonContainer}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
            >
              <Text style={styles.backButton}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>Statistics</Text>
            <View style={styles.headerSpacer} />
          </View>
          <FlatList
              data={data}
              renderItem={({ item }) => (
                  <View style={styles.statItem}>
                    <Text style={styles.statText}>{item.label}</Text>
                  </View>
              )}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => clearStats()}
            >
              <Text style={styles.buttonText}>Clear Statistics</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
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
            <Stack.Screen name="Stats" component={StatsScreen} options={{ statusBarStyle: 'light' }} />
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


