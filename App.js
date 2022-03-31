import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [matricula, setMatricula] = useState('');
  const [codigo, setCodigo] = useState('');
  const [situacao, setSituacao] = useState('');

  let dados = []

  const botao = () => {
    if(matricula == '' || codigo == '' || situacao == '') {
      alert('Dados invalidos!')
    } else {
      dados.push(
        {
          "matricula": matricula,
          "codigo": codigo,
          "situacao": situacao,
        }
      )
      alert(
        'Dados salvos!'
      )
      setMatricula('')
      setCodigo('')
      setSituacao('')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Informe sua matrícula:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMatricula}
        value={matricula}
      />

      <Text style={styles.text}>Informe o código:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCodigo}
        value={codigo}
      />

      <Text style={styles.text}>Informe a situação:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSituacao}
        value={situacao}
      />

      <Button
        title="Salvar"
        onPress={botao}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },  
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
