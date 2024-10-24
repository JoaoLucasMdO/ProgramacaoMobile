import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Usuario/HomeScreen";
import CadastroScreen from "./src/screens/Usuario/CadastroScreen";
import ConsultaScreen from "./src/screens/Usuario/ConsultaScreen";

// Criando o Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Definindo a tela "Home" */}
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Definindo a tela "Cadastro" */}
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        {/* Definindo a tela "Consulta" */}
        <Stack.Screen name="Consulta" component={ConsultaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
