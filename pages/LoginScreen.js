import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import * as Animate from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import * as SQLite from 'expo-sqlite'
import AsyncStorage from '@react-native-async-storage/async-storage'

const db = SQLite.openDatabase('app.db')

export default function Login() {
  const navigation = useNavigation()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = () => {
    if (!login || !password) {
      setErrorMessage('Por favor, preencha todos os campos.')
      return
    }

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE login = ? AND password = ?',
        [login, password],
        async (_, { rows }) => {
          if (rows.length > 0) {
            const user = rows._array[0]
            await AsyncStorage.setItem('userId', user.userId)
            navigation.navigate('Home')
          } else {
            setErrorMessage('Login ou senha incorretos')
          }
        },
        (_, error) => {
          console.error('Erro ao verificar o login:', error)
          setErrorMessage('Ocorreu um erro ao tentar fazer login.')
        },
      )
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.containerLogo}>
        <Animate.Image
          animation="flipInY"
          source={require('../assets/images/logo.png')}
          style={styles.image}
          resizeMode="center"
          marginTop={-180}
        />
      </View>
      <Animate.View
        delay={600}
        animation="fadeInUp"
        style={styles.containerForm}
      >
        <Text style={styles.textTitle}>Olá, acesse sua conta</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          style={styles.input}
          value={login}
          onChangeText={setLogin}
        />
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity onPress={handleLogin} style={styles.buttonAccess}>
          <Text style={styles.textAccess}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.textRegister}>Criar Conta</Text>
        </TouchableOpacity>
      </Animate.View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  containerLogo: {
    flex: 2,
  },
  image: {
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  containerForm: {
    flex: 2,
    backgroundColor: '#ffff',
    borderRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
    margin: 24,
    borderColor: '#4d4d4d',
    borderWidth: 0.5,
  },
  textTitle: {
    fontSize: 24,
    paddingVertical: 8,
    fontWeight: 'bold',
    color: '#4d4d4d',
    marginBottom: 12,
    marginTop: 24,
    alignSelf: 'center',
  },
  input: {
    borderColor: '#4d4d4d',
    borderWidth: 0.5,
    borderRadius: 25,
    marginBottom: 12,
    padding: 15,
  },
  buttonAccess: {
    position: 'absolute',
    backgroundColor: '#fff7ed',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAccess: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d4d4d',
  },
  buttonRegister: {
    position: 'absolute',
    backgroundColor: '#fff7ed',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textRegister: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d4d4d',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
})
