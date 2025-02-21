import { ScrollView } from "react-native";
import { OkpText } from "@/components/common";

export default function Home() {
  const url = window.location.href;
  return (
    <ScrollView>
      <OkpText bold>
        OYKUS This should be bold text: {url}
      </OkpText>
      <OkpText>
        OYKUS This should be regular text
      </OkpText>
    </ScrollView>
  );
}
