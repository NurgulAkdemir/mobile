
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../constants/firebaseConfig';

const MoodEntry = () => {
  const [mood, setMood] = useState('');
  const db = getFirestore(app);

  const handleSave = async () => {
    if (!mood.trim()) {
      Alert.alert('Uyarı', 'Lütfen bir ruh hali girin.');
      return;
    }

    try {
      await addDoc(collection(db, 'moods'), {
        mood,
        timestamp: new Date(),
      });
      Alert.alert('Başarılı', 'Ruh hali kaydedildi!');
      setMood('');
    } catch (error) {
      console.error('Veri eklenemedi:', error);
      Alert.alert('Hata', 'Bir şeyler ters gitti.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bugün nasıl hissediyorsun?</Text>
      <TextInput
        style={styles.input}
        placeholder="Mutlu, stresli, heyecanlı..."
        value={mood}
        onChangeText={setMood}
      />
      <Button title="Kaydet" onPress={handleSave} />
    </View>
  );
};

export default MoodEntry;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});

