import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getDatabase, ref, get, query, orderByChild } from 'firebase/database';

const Podium = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPodiumData();
  }, []);

  const fetchPodiumData = async () => {
    try {
      const db = getDatabase(); // Initialize the Realtime Database
      const quizzesRef = ref(db, 'quizzes'); // Reference to the quizzes data

      // Fetch all users' quiz data
      const snapshot = await get(quizzesRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        // Process the data to calculate the count of correct answers for each user
        const usersData = Object.keys(data).map((userId) => {
          const userQuiz = data[userId];
          const correctCount = userQuiz.answers.filter((answer) => answer.isCorrect).length;

          return {
            userId,
            correctCount,
            completedAt: userQuiz.completedAt,
          };
        });

        // Sort users by the count of correct answers in descending order
        const sortedUsers = usersData.sort((a, b) => b.correctCount - a.correctCount);

        setUsers(sortedUsers);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching podium data:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6641F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Podium</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.userId}
        renderItem={({ item, index }) => (
          <View style={styles.userContainer}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Text style={styles.userId}>User: {item.userId}</Text>
            <Text style={styles.correctCount}>Correct Answers: {item.correctCount}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userId: {
    fontSize: 16,
    color: '#333',
  },
  correctCount: {
    fontSize: 16,
    color: '#4CAF50',
  },
});

export default Podium;