import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AtualizaScreen from "./screen/AtualizaScreen";
import CadastroScreen from "./screen/CadastroScreen";
import ConsultaScreen from "./screen/ConsultaScreen";
import DeleteScreen from "./screen/DeleteScreen";
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
          options={{ title: "Cadastro de Usuário" }}
        />
        <Stack.Screen
          name="Consulta"
          component={ConsultaScreen}
          options={{ title: "Consulta de Usuário" }}
        />
        <Stack.Screen
          name="Alteracao"
          component={AtualizaScreen}
          options={{ title: "Atualização de Usuário" }}
        />
        <Stack.Screen
          name="Apagar"
          component={DeleteScreen}
          options={{ title: "Excluir Usuário" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
