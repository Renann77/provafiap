import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDatabase, ref, set } from 'firebase/database'; // Import Firebase Realtime Database
import { auth } from '../firebase/config'; // Import Firebase auth to get the current user

const ReviewAnswers = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedQuestions, answers } = route.params;

  const handleFinishQuiz = async () => {
    try {
      const userId = auth.currentUser.uid; // Get the current user's UID
      const db = getDatabase(); // Initialize the Realtime Database
      const quizRef = ref(db, `quizzes/${userId}`); // Reference to the user's quiz data

      // Prepare the data to save
      const quizData = selectedQuestions.map((question, index) => ({
        question: question.question,
        theme: question.theme,
        userAnswer: answers[index] !== null ? question.answers[answers[index]] : 'Not Answered',
        correctAnswer: question.answers[question.correctAnswer],
        isCorrect: answers[index] === question.correctAnswer, // Check if the answer is correct
      }));

      // Save the data to the database
      await set(quizRef, {
        completedAt: new Date().toISOString(),
        answers: quizData,
      });

      Alert.alert('Success', 'Your quiz data has been saved!');
      navigation.navigate('Results', { quizData }); // Navigate to the Results page with quiz data
    } catch (error) {
      console.error('Error saving quiz data:', error);
      Alert.alert('Error', 'Failed to save quiz data. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Review Your Answers</Text>
      {selectedQuestions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{index + 1}. {question.question}</Text>
          <Text style={styles.answer}>
            Sua resposta: {answers[index] !== null ? question.answers[answers[index]] : 'Not Answered'}
          </Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Quiz')}
      >
        <Text style={styles.buttonText}>Go Back to Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.finishButton]}
        onPress={handleFinishQuiz} // Call the function to save data
      >
        <Text style={styles.buttonText}>Finish Quiz</Text>
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
  questionContainer: {
    marginBottom: 15,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    backgroundColor: '#6641F3',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  finishButton: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReviewAnswers;