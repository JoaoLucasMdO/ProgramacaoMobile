import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Consulta de Usuario</Text>
      <Button title="Consultar" />
    </View>
  );
}