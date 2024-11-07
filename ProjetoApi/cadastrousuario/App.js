import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AtualizaScreen from "./screen/AtualizaScreen";

import CadastroScreen from "./screen/CadastroScreen";

import ConsultaScreen from "./screen/ConsultaScreen";

import DeleteScreen from "./screen/DeleteScreen";

import HomeScreen from "./screen/HomeScreen"; // Import da nova tela

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        options={{ title: "Página Inicial" }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Consulta" component={ConsultaScreen} />
        <Stack.Screen name="Alteracao" component={AtualizaScreen} />
        <Stack.Screen name="Apagar" component={DeleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
