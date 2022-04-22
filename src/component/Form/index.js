import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Vibration,
  Pressable,
  Keyboard,
  FlatList,
} from "react-native";
import ResultIMC from "./ResultIMC";
import styles from "./style";

export default function Form() {
  const [altura, setAltura] = useState(null);
  const [peso, setPeso] = useState(null);
  const [messagemIMC, setMenssagemIMC] = useState("Preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(null);
  const [imcList, setImcList] = useState([]);

  function imcCalcular() {
    let alturaFormatada = altura.replace(",", ".");
    let totalImc = (
      parseFloat(peso) /
      (parseFloat(alturaFormatada) * parseFloat(alturaFormatada))
    ).toFixed(2);
    setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
    setImc(totalImc);
  }

  function verificarImc() {
    if (imc == null) {
      Vibration.vibrate();
      setErrorMessage("campo obrigatório*");
    }
  }

  function validadorImc() {
    console.log(imcList);
    if (peso != null && altura != null) {
      imcCalcular();
      setAltura(null);
      setPeso(null);
      setMenssagemIMC("Seu imc é igual: ");
      setTextButton("Calcular Novamente");
      setErrorMessage(null);
    } else {
      verificarImc();
      setImc(null);
      setTextButton("Calcular");
      setMenssagemIMC("Preencha o peso e altura");
    }
  }

  return (
    <View style={styles.formContext}>
      {imc == null ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAltura}
            value={altura}
            placeholder="Ex. 1.75"
            keyboardType="numeric"
          />

          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPeso}
            value={peso}
            placeholder="Ex. 80.854"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.buttonCalcular}
            onPress={() => validadorImc()}
            title={textButton}
          >
            <Text style={styles.textButtonCalcular}>{textButton}</Text>
          </TouchableOpacity>
        </Pressable>
      ) : (
        <View style={styles.exibirResultIMC}>
          <ResultIMC messagemResultIMC={messagemIMC} resultImc={imc} />
          <TouchableOpacity
            style={styles.buttonCalcular}
            onPress={() => validadorImc()}
            title={textButton}
          >
            <Text style={styles.textButtonCalcular}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        style={styles.listaImcs}
        data={imcList.reverse()}
        renderItem={({ item }) => {
          return (
            <Text style={styles.resultImcItem}>
              <Text style={styles.textResultImcItem}>Resultado IMC = </Text>
              {item.imc}
            </Text>
          );
        }}
        keyExtractor={(item) => {
          item.id;
        }}
      />
    </View>
  );
}
