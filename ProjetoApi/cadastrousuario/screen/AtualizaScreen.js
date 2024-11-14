import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const AtualizaScreen = () => {
  const route = useRoute();
  const { id: userId } = route.params; // Recebe o id passado via navegação
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Função para buscar dados do usuário
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://10.68.153.97:3000/api/consulta/${userId}`
      );
      const { nome, email, senha } = response.data;
      setNome(nome);
      setEmail(email);
      setSenha(senha);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      Alert.alert("Erro", "Não foi possível buscar os dados do usuário.");
    }
  };

  // Carrega os dados do usuário quando o componente é montado
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleAtualizacao = async () => {
    if (!userId || !nome || !email || !senha) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await axios.put(
        `http://10.68.153.97:3000/api/atualizacao/${userId}`,
        {
          nome,
          email,
          senha,
        }
      );
      Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      Alert.alert("Erro", "Falha ao atualizar usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualização de Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="ID do Usuário"
        value={userId.toString()}
        editable={false} // Impede que o ID seja editado
      />

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button
        title="Atualizar Usuário"
        onPress={handleAtualizacao}
        color="#6200ee"
      />
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
  input: {
    width: "100%",
    height: 50,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});

export default AtualizaScreen;
