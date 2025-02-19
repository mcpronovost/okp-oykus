import { View, FlatList, StyleSheet } from "react-native";
import { OkpText } from "@/components/common";
import { v } from "@/assets/style";
export default function Home() {

  return (
    <View style={styles.container}>
      <OkpText style={{ ...v.fonts.defaultBold }}>OYKUS This should be bold text</OkpText>
      <OkpText style={{ ...v.fonts.default }}>OYKUS This should be regular text</OkpText>
      <FlatList style={styles.itemsContainer} contentContainerStyle={styles.itemsList} data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} renderItem={({ item }) => (
        <OkpText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</OkpText>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  itemsContainer: {
    flex: 1,
    width: '100%',
  },
  itemsList: {
    width: '100%',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
});
