import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: 5,
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
  },
});

export default function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <FlatList
      data={tasks}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <TouchableOpacity onPress={() => onToggle(item.id)}>
            <Text
              style={{
                textDecorationLine: item.completed ? "line-through" : "none",
                color: item.completed ? "gray" : "black",
              }}
            >
              {item.text}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
