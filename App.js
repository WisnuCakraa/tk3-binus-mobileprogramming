import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import ReportScreen from './components/ReportScreen';
import { HomeIcon, FormIcon } from './components/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const App = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('calculations');
        if (savedData !== null) {
          setData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  const saveData = async newData => {
    try {
      await AsyncStorage.setItem('calculations', JSON.stringify(newData));
      setData(newData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: route.name,
          tabBarStyle: {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
          tabBarIcon: ({ color, size }) => {
            let iconComponent;
            switch (route.name) {
              case 'Home':
                iconComponent = <HomeIcon width={size} height={size} color={color} />;
                break;
              case 'Report':
                iconComponent = <FormIcon width={size} height={size} color={color} />;
                break;
              default:
                iconComponent = null;
            }
            return iconComponent;
          },
        })}
      >
        <Tab.Screen name="Home">
          {() => <HomeScreen data={data} saveData={saveData} />}
        </Tab.Screen>
        <Tab.Screen name="Report" component={ReportScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
