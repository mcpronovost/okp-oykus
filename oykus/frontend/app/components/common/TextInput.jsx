import { View, TextInput, StyleSheet } from "react-native";

export default function OkpTextInput({ icon, ...props }) {
  const Icon = icon;

  return (
    <View style={styles.container}>
      {Icon && <Icon size={24} style={styles.icon} />}
      <TextInput style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "red",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    color: "inherit",
  },
  icon: {
    marginRight: 8,
  },
});
