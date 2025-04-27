import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../constants/firebaseConfig';
 // doğru yolu kullan

interface Mood {
  id: string;
  mood: string;
  timestamp?: any; // Opsiyonel, Firestore'dan timestamp geliyor
}

const MoodListScreen = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'moods'));
        const moodsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Mood[];
        setMoods(moodsData);
      } catch (error) {
        console.error('Ruh halleri alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (moods.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Henüz kayıtlı ruh hali yok.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={moods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.moodItem}>
            <Text style={styles.moodText}>Ruh Hali: {item.mood}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MoodListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loader: {
    marginTop: 100,
  },
  moodItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  moodText: {
    fontSize: 18,
  },
});

