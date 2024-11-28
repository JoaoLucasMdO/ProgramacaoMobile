import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const DeleteScreen = ({ route, navigation }) => {
  const { id } = route.params; // Obtém o 'id' passado por navegação
  const [userId, setUserId] = useState(id);

  useEffect(() => {
    // Caso o id vindo da navegação seja alterado, atualize o estado
    if (id) {
      setUserId(id);
    }
  }, [id]);

  const handleDelete = async () => {
    if (!userId) {
      Alert.alert("Erro", "O campo ID é obrigatório.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://10.68.152.149:3000/api/deletar/${userId}`
      );
      Alert.alert("Sucesso", response.data.message);
      setUserId("");
      navigation.goBack(); // Volta para a tela anterior após a exclusão
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      Alert.alert("Erro", "Falha ao deletar usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deletar Usuário</Text>
      <Text style={styles.label}>ID do Usuário:</Text>
      <Text style={styles.input}>{userId}</Text>
      <Button title="Deletar Usuário" onPress={handleDelete} color="#6200ee" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 18,
    marginBottom: 12,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});

export default DeleteScreen;
