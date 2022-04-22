import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

export default function Title (){
    return (
        <View style={styles.boxTitletle}>
            <Text style={styles.textTitle}>OneBitHealth JF3</Text>
        </View>

    );
}