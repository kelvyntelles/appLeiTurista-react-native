import React, {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';

import { Camera } from 'expo-camera';

import { FontAwesome } from "@expo/vector-icons";

export default function App() {
  const [matricula, setMatricula] = useState('');
  const [codigo, setCodigo] = useState('');
  const [situacao, setSituacao] = useState('');

  const camRef = useRef(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHasPermission] = useState(null)
  const [capturedPhoto, setCapturedPhoto] = useState(null)

  useEffect(()=>{
    (async () =>{
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === "granted");
    }) ();
  }, [])

  if(hasPermission === null){
    return <View/>
  }

  if(hasPermission === false){
    return <Text>Acesso negado</Text>
  }

  async function takePicture() {
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri)
    }
  }

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
      <Camera
        style={styles.camera}
        type={type}
      >
        <View style={styles.contentButtons}> 
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() =>{
              type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
            }}
          >
            <FontAwesome name="exchange" size={23} color="#1E90FF"></FontAwesome>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCamera}
            onPress={takePicture}
          >
            <FontAwesome name="camera" size={23} color="#fff"></FontAwesome>
          </TouchableOpacity>
        </View>
      </Camera>
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
    backgroundColor: '#F8F8FF',
    alignItems: 'center',
    paddingTop: 50
  },
  text: {
    color: 'black',
    fontSize: 20,
  },  
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  camera:{
    width: "100%",
    height: "50%",
    marginBottom: 40
  },
  contentButtons:{
    flex: 1,
    backgroundColor:"transparent",
    flexDirection: "row",
  },
  buttonFlip:{
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  buttonCamera:{
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E90FF",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  }
});
