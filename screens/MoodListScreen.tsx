import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/constants/firebaseConfig';

export default function MoodListScreen() {
  const [moods, setMoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'moods'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMoods(data);
      } catch (error) {
        console.error('Kayıtlar alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'moods', id));
      setMoods((prev) => prev.filter((mood) => mood.id !== id));
    } catch (error) {
      console.error('Kayıt silinemedi:', error);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.text}>Ruh Hali: {item.mood}</Text>
      {item.timestamp && (
        <Text style={styles.timestamp}>
          {new Date(item.timestamp.seconds * 1000).toLocaleString('tr-TR')}
        </Text>
      )}
      <Text style={styles.deleteText} onPress={() => handleDelete(item.id)}>
        ❌ Sil
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geçmiş Kayıtlarım</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={moods}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
  },
  timestamp: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  deleteText: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

