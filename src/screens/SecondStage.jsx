import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SecondStage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à 2ª Etapa!</Text>
      <Image
        source={{
          uri: 'https://www.universityofcalifornia.edu/sites/default/files/styles/article_default_banner/public/baby-yoda-picture.jpg?h=1687f3cf&itok=J3mcreSv',
        }}
        style={styles.image}
      />
      <Text style={styles.text}>
            Você acabou de usar uma ferramenta de avaliação. Essa não será a única da sua vida. Mas creio que essa será uma das primeiras onde você verá o código e opinará sobre ele.
        </Text>
        <Text style={styles.text}>
Dado todos os seus conhecimentos de React e React Native, queremos que, dado o codigo que você pode descer em: https://github.com/tommymolto/provafiap.git 
</Text>
        <Text style={styles.text}>Dê 10 sugestões de melhoria de código e usabilidade, descrevendo como faze-la (70%)</Text>
        <Text style={styles.text}>Ex: acho que podemos encapsular o codigo de quiz em uma componente question, tirando todo o codigo de controle de que questõ é exibida da mesma tela que randomiza e exibe a questao em si</Text>
        <Text style={styles.text}>Implemente 3 das sugestões e solicite um Pull Request (30%)</Text>
        <Text style={styles.text}>O Pull Request não ser aceito não significa erro. Mas seu pull request deve estar funcionando. </Text>

        <Text style={styles.text}>Mas todos os Pul Request aceitos terão seu nome eternizado aqui, utilizados em outras turmas </Text>
        <Text style={styles.text}>Caso tenha alguma ideia com a solução crie um fork, mantendo os creditos iniciais ao professor, mas continue a evolução. O https://scrimba.com/home nasceu de uma prova assim.  </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6641F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SecondStage;