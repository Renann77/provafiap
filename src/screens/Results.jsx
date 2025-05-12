import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth } from '../firebase/config'; // Import Firebase auth to get the current user

const Results = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { quizData } = route.params;

  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Get the current user's ID
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
    }
  }, []);

  // Group results by theme
  const resultsByTheme = quizData.reduce((acc, item) => {
    if (!acc[item.theme]) {
      acc[item.theme] = [];
    }
    acc[item.theme].push(item);
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Quiz Results</Text>
      {/* Display the user ID */}
      <Text style={styles.userId}>User ID: {userId}</Text>
      {Object.keys(resultsByTheme).map((theme, index) => (
        <View key={index} style={styles.themeContainer}>
          <Text style={styles.themeTitle}>{theme}</Text>
          {resultsByTheme[theme].map((item, idx) => (
            <View key={idx} style={styles.resultContainer}>
              <Text style={styles.question}>{idx + 1}. {item.question}</Text>
              <Text style={styles.answer}>
                Your Answer: {item.userAnswer !== 'Not Answered' ? item.userAnswer : 'Not Answered'}
              </Text>
              <Text style={styles.correct}>
                {item.userAnswer !== 'Not Answered'
                  ? item.isCorrect
                    ? 'Correct'
                    : 'Incorrect'
                  : ''}
              </Text>
            </View>
          ))}
        </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={[styles.button, styles.secondStageButton]}
  onPress={() => navigation.navigate('SecondStage')}
>
  <Text style={styles.buttonText}>2ª Etapa</Text>
</TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  themeContainer: {
    marginBottom: 20,
  },
  themeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultContainer: {
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    color: '#666',
  },
  correct: {
    fontSize: 16,
    color: '#4CAF50', // Green for correct answers
  },
  button: {
    backgroundColor: '#6641F3',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Results;