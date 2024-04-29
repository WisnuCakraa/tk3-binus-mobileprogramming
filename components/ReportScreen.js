import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportScreen = ({ navigation }) => {
  const [calculations, setCalculations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCalculations = async () => {
      try {
        const savedCalculations = await AsyncStorage.getItem('calculations');
        if (savedCalculations !== null) {
          setCalculations(JSON.parse(savedCalculations));
        }
        setIsLoading(false);
      } catch (error) {
        console.log('Error:', error);
        setIsLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(true);
      fetchCalculations();
    });

    return unsubscribe;
  }, [navigation]);

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report Page</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <FlatList
            data={calculations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderCard}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    alignItems: 'center',
    minHeight: '100%',
  },
  card: {
    backgroundColor: '#97E7E1',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    width: '100%',
    minWidth: 350,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
  },
});

export default ReportScreen;
