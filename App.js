import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/Login';
import Home from './src/screens/Home';
import Quiz from './src/screens/Quiz';
import ReviewAnswers from './src/screens/ReviewAnswers';
import Results from './src/screens/Results';
import Podium from './src/screens/Podium';
import SecondStage from './src/screens/SecondStage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="ReviewAnswers" component={ReviewAnswers} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Podium" component={Podium} />
        <Stack.Screen name="SecondStage" component={SecondStage} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;