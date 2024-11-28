import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const CadastroScreen = () => {
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Pendente"); // Status inicial

  const handleCadastro = async () => {
    // Validação para impedir envio de dados vazios
    if (!descricao.trim()) {
      Alert.alert("Erro", "O campo de descrição não pode estar vazio.");
      return;
    }
    try {
      const response = await axios.post(
        "http://10.68.152.149:3000/api/tarefas",
        { descricao, status }
      );
      console.log(response.data);
      Alert.alert("Sucesso", response.data.message);

      setDescricao("");
      setStatus("Pendente"); // Reseta o status para o valor padrão
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Text style={styles.label}>Status</Text>
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
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  pickerContainer: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default CadastroScreen;
