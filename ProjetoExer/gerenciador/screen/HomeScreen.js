import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
  Alert, // Importação do Alert
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Ícones Material Design

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Função para buscar tarefas via GET
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://10.68.152.149:3000/api/tarefas");
      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data); // Atualiza também a lista filtrada
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // Atualiza a tela toda vez que ela ganha foco
  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  // Atualiza a lista de tarefas filtradas com base na barra de pesquisa
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredTasks(tasks); // Mostra todas as tarefas se a busca estiver vazia
    } else {
      const filtered = tasks.filter((task) =>
        task.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  }, [searchQuery, tasks]);

  // Função para deletar uma tarefa
  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `http://10.68.152.149:3000/api/tarefas/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json(); // Obtém a resposta do backend

      if (response.ok) {
        // Se a resposta for positiva, filtra a tarefa excluída
        setTasks(tasks.filter((task) => task.id !== id));
        Alert.alert("Sucesso", data.message); // Exibe mensagem de sucesso
      } else {
        // Caso o backend tenha retornado um erro
        Alert.alert("Erro", "Não foi possível deletar a tarefa.");
      }
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar excluir a tarefa.");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Adicionar Nova Tarefa"
        onPress={() => navigation.navigate("Cadastro")}
        color="#6200ee"
      />

      {/* Barra de Pesquisa */}
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar tarefas..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Lista de Tarefas */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <View style={styles.taskContent}>
              <Icon
                name={item.status === "Completo" ? "check-circle" : "pending"}
                size={24}
                color={item.status === "Completo" ? "green" : "orange"}
                style={styles.taskIcon}
              />
              <View>
                <Text style={styles.taskText}>{item.descricao}</Text>
                <Text style={styles.taskStatus}>
                  {item.status === "Completo" ? "✔ Completo" : "⏳ Pendente"}
                </Text>
              </View>
            </View>
            <View style={styles.taskButtons}>
              <Button
                title="Atualizar"
                onPress={() =>
                  navigation.navigate("Alteracao", { id: item.id })
                }
                color="#03dac6"
              />
              <Button
                title="Deletar"
                onPress={() => deleteTask(item.id)}
                color="#ff5c5c"
              />
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  listContainer: {
    marginTop: 20,
  },
  taskContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskIcon: {
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  taskStatus: {
    fontSize: 14,
    color: "#666",
  },
  taskButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default HomeScreen;
