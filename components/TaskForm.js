import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function TaskForm({ onSave }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSave(text);
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter new task"
        style={styles.input}
      />
      <Button title="Add" onPress={handleSubmit} />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "white",
  },
};
