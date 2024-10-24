import React from "react";
import { Text, View, Image } from "react-native";

export default function Jobs(props) {
  return (
    <View>
      <Image
        source={{ uri: props.img }}
        style={{ width: props.largura, height: props.altura }}
      />
      <Text> {props.fulano}</Text>
    </View>
  );
}
