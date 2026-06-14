

import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaReproductor from './Pantalla/PantallaReproductor';

const Pila = createNativeStackNavigator();

export default function Aplicacion() {
  return (
    <NavigationContainer>
      <Pila.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1D4ED8' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Pila.Screen
          name="Reproductor"
          component={PantallaReproductor}
          options={{
            title: 'Reproductor de Musica',
            headerRight: () => (
              <Image
                source={require('./assets/audio/icono.png')}
                style={{ width: 28, height: 28, marginRight: 97, tintColor: '#FFFFFF' }}
              />
            ),
          }}
        />
      </Pila.Navigator>
    </NavigationContainer>
  );
}