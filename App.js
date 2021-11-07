/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './views/Login';
import Principal from './views/Principal';
import Registrar from './views/Registrar';
import MensajesPredeterminados from './views/MensajesPredeterminados';
import EstamosContigo from './views/EstamosContigo';
import ContactoEmergencia from './views/ContactoEmergencia';
import DistritoAlerta from './views/DistritoAlerta';
import DatosPersonales from './views/DatosPersonales';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ headerStyle: { backgroundColor: '#FFEFD5' } }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="DistritoAlerta" component={DistritoAlerta} options={{ title: 'Distritos con más alertas'}} />
        <Stack.Screen name="ContactoEmergencia" component={ContactoEmergencia} options={{ title: 'Contactos de emergencia'}} />
        <Stack.Screen name="EstamosContigo" component={EstamosContigo} options={{ title: '¡Estamos contigo!'}} />
        <Stack.Screen name="Registrar" options={{ title: 'Registrate en CUIDEMONOS' }} component={Registrar} />
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="DatosPersonales" options={{ title: 'Datos Personales' }} component={DatosPersonales} />
        <Stack.Screen name="MensajesPredeterminados" options={{ title: 'Mensajes predeterminados'}} component={MensajesPredeterminados} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
