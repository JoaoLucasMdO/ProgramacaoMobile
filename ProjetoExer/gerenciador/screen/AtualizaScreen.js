import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker"; // Importando o Picker

const AtualizaScreen = () => {
  const route = useRoute();
  const { id: taskId } = route.params; // Recebe o id passado via navegação
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");

  // Função para buscar dados da tarefa
  const fetchTaskData = async () => {
    try {
      const response = await axios.get(
        `http://10.68.152.149:3000/api/tarefas/${taskId}`
      );
      const { descricao, status } = response.data;
      setDescricao(descricao);
      setStatus(status);
    } catch (error) {
      console.error("Erro ao buscar dados da tarefa:", error);
      Alert.alert("Erro", "Não foi possível buscar os dados da tarefa.");
    }
  };

  // Carrega os dados da tarefa quando o componente é montado
  useEffect(() => {
    if (taskId) {
      fetchTaskData();
    }
  }, [taskId]);

  const handleAtualizacao = async () => {
    if (!descricao || !status) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await axios.put(
        `http://10.68.152.149:3000/api/tarefas/${taskId}`,
        {
          descricao,
          status,
        }
      );
      Alert.alert("Sucesso", "Tarefa atualizada com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
      Alert.alert("Erro", "Falha ao atualizar a tarefa.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Atualização de Tarefa</Text>

      <TextInput
        style={styles.input}
        placeholder="ID da Tarefa"
        value={taskId.toString()}
        editable={false} // Impede que o ID seja editado
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      {/* Picker para selecionar o status */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pendente" value="Pendente" />
          <Picker.Item label="Completo" value="Completo" />
        </Picker>
      </View>

      <Button
        title="Atualizar Tarefa"
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
  pickerContainer: {
    width: "100%",
    height: 50,
    borderColor: "#dddddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 50,
  },
});

export default AtualizaScreen;
