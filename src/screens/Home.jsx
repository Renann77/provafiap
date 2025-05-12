import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const startQuiz = () => {
    navigation.navigate('Quiz'); // Navigate to the Quiz screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Image
        source={{
          uri: 'https://64.media.tumblr.com/851a597ee0f0fb59f6bd43ef121ca676/4da7940dfc8b394e-7d/s540x810/5422985a3cc73153e24d55ac7f65617bb40b2298.gifv',
        }}
        style={styles.gif}
      />
      <Text style={styles.texto}>
        Fique calmo. Essa prova é uma simulação nivel basico de uma entrevista da Amazon e/ou Google, além de outras empresas, de React Native!
      </Text>
      <Text style={styles.texto}>
        Tentamos deixar o mais próximo do real, e filtrando o conteúdo das perguntas a itens que passamos na classe, ou com referências para leitura prévia ou póstuma
      </Text>

      <Button title="Começar Quiz" onPress={startQuiz} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  gif: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  texto: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Home;