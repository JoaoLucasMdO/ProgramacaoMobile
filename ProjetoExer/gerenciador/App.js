import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AtualizaScreen from "./screen/AtualizaScreen";
import CadastroScreen from "./screen/CadastroScreen";
import HomeScreen from "./screen/HomeScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Página Inicial" }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ title: "Cadastro de Tarefas" }}
        />
        <Stack.Screen
          name="Alteracao"
          component={AtualizaScreen}
          options={{ title: "Atualização de Tarefas" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
