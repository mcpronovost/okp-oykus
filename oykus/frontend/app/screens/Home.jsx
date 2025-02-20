import { ScrollView, FlatList, StyleSheet } from "react-native";
import { OkpText } from "@/components/common";

export default function Home() {
  return (
    <ScrollView>
      <OkpText bold>
        OYKUS This should be bold text
      </OkpText>
      <OkpText>
        OYKUS This should be regular text
      </OkpText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexBasis: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  itemsContainer: {
    flex: 1,
    width: "100%",
  },
  itemsList: {
    width: "100%",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
});
