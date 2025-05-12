import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import questions from '../../assets/questions.json'; // Updated path to questions.json

const Quiz = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]); // Track answers for each question
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); // Initialize navigation

  const QUESTIONS_PER_THEME = 5; // Number of questions per theme

  useEffect(() => {
    prepareQuiz();
  }, []);

  const prepareQuiz = async () => {
    try {
      const themes = Object.keys(questions);
      if (!themes.length) {
        throw new Error('No themes found in questions.json');
      }

      let allQuestions = [];

      // Randomize questions by theme
      themes.forEach((theme) => {
        const themeQuestions = questions[theme] || [];
        const shuffled = shuffleArray(themeQuestions);
        allQuestions = [...allQuestions, ...shuffled.slice(0, QUESTIONS_PER_THEME)];
      });

      // Shuffle final questions
      const finalQuestions = shuffleArray(allQuestions).map((question) => ({
        ...question,
        theme: themes.find((theme) => questions[theme].includes(question)),
      }));
      setSelectedQuestions(finalQuestions);

      // Initialize answers
      setAnswers(new Array(finalQuestions.length).fill(null)); // Initialize answers as null
      setIsLoading(false);
    } catch (error) {
      console.error('Error preparing quiz:', error.message);
      setIsLoading(false);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswer = (selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = selectedOption; // Update the answer for the current question
    setAnswers(updatedAnswers);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6641F3" />
      </View>
    );
  }

  const currentQ = selectedQuestions[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.theme}>
          Theme: {currentQ.theme.charAt(0).toUpperCase() + currentQ.theme.slice(1)}
        </Text>
        <Text style={styles.questionCount}>
          Question {currentQuestion + 1}/{selectedQuestions.length}
        </Text>
        <Text style={styles.question} testID="question-text">
          {currentQ.question}
        </Text>
        {currentQ.answers.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              answers[currentQuestion] === index && styles.selectedButton,
            ]}
            onPress={() => handleAnswer(index)}
            testID={`option-${index}`}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <ScrollView horizontal>
          {selectedQuestions.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.navButton,
                currentQuestion === index && styles.currentNavButton, // Highlight the current question
                answers[index] !== null && styles.answeredNavButton, // Highlight answered questions in green
              ]}
              onPress={() => setCurrentQuestion(index)}
            >
              <Text style={styles.navButtonText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
          {/* Acabar Quiz Button */}
          
        </ScrollView>
        <TouchableOpacity
            style={[styles.navButton, styles.finishButton]}
            onPress={() => navigation.navigate('ReviewAnswers', { selectedQuestions, answers })}
          >
            <Text style={styles.navButtonText}>Acabar Quiz</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  navButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  currentNavButton: {
    backgroundColor: '#6641F3',
  },
  answeredNavButton: {
    backgroundColor: '#4CAF50', // Green for answered questions
  },
  finishButton: {
    backgroundColor: '#FF5722', // Orange for "Acabar Quiz"
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  theme: {
    fontSize: 18,
    color: '#6641F3',
    marginBottom: 10,
  },
  questionCount: {
    fontSize: 16,
    marginBottom: 20,
  },
  question: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6641F3',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  navigationBar: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  navButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  currentNavButton: {
    backgroundColor: '#6641F3',
  },
  answeredNavButton: {
    backgroundColor: '#4CAF50', // Green for answered questions
  },
  finishButton: {
    backgroundColor: '#FF5722', // Orange for "Acabar Quiz"
  },
  navButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Quiz;