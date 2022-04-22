import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import styles from "./style";

export default function ResultIMC(props) {

  const onShare = async () => {
    const result = await Share.share({
      message: "Meu IMC hoje é: " + props.resultImc,
    });
  };

  return (
    <View style={styles.resultImc}>
      <View style={styles.boxSharedbutton}>
      <Text style={styles.information}>{props.messagemResultIMC}</Text>
      <Text style={styles.numberImc}>{props.resultImc}</Text>
        <TouchableOpacity onPress={onShare} style={styles.shared}>
          <Text style={styles.sharedText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
