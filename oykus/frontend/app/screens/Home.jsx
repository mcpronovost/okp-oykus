import { ScrollView } from "react-native";
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
