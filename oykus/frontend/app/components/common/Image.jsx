import { useState } from "react";
import { Image, View } from "react-native";

export default function OkpImage({ source, style, ...props }) {
  const [error, setError] = useState(false);

  if (error) {
    return <View style={style} />;
  }

  return <Image source={source} style={style} {...props} onError={() => setError(true)} />;
}
