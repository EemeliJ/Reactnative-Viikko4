import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const handleNewTaskSubmit = (taskText) => {
    if (taskText.trim()) {
      const newTaskItem = { text: taskText, completed: false, id: Date.now() };
      const updatedTasks = [...tasks, newTaskItem];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Todo List
        </Text>
      </View>

      <TaskForm onSave={handleNewTaskSubmit} />
      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleCompleted}
      />
    </View>
  );
}
