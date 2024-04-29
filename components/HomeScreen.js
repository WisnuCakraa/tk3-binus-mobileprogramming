import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ data, saveData }) => {
  const [inputText, setInputText] = useState('');

  const addToInput = digit => {
    setInputText(prevInputText => prevInputText + digit);
  };

  const clearInput = () => {
    setInputText('');
  };

  const saveInput = async () => {
    if (inputText.trim() === '') {
      Alert.alert('Error', 'Input cannot be empty');
      return;
    }
    
    try {
      const newData = [...(data || []), inputText];
      await AsyncStorage.setItem('calculations', JSON.stringify(newData));
      saveData(newData);
      setInputText('');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Page</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          value={inputText}
          onChangeText={setInputText}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.gridButton} onPress={() => addToInput('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridButton} onPress={() => addToInput('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridButton} onPress={() => addToInput('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.gridButton, { flex: 1 }]} onPress={() => addToInput('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.gridButton} onPress={() => addToInput('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridButton} onPress={() => addToInput('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridButton} onPress={() => addToInput('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.gridButton, { flex: 1, backgroundColor: '#8DECB4' }]} onPress={saveInput}>
            <Text style={styles.buttonText}>SIMPAN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridRow}>
          <TouchableOpacity style={styles.gridButton} onPress={() => addToInput('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridButton} onPress={() => addToInput('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridButton} onPress={() => addToInput('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.gridButton, { flex: 1, backgroundColor: '#DD5746' }]} onPress={clearInput}>
            <Text style={styles.buttonText}>CLEAR</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    height: 100,
    width: 350
  },
  inputText: {
    padding: 10,
    width: 200,
  },
  gridContainer: {
    display: 'grid',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 100
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  gridButton: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
  },
});

export default HomeScreen;
