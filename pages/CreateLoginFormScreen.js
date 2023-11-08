import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import * as Animate from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import { openDatabase } from 'expo-sqlite'

const db = openDatabase('app.db')

export default function CreateLogin() {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = async () => {
    if (!name || !login || !password || !confirmPassword || !gender) {
      setErrorMessage('Todos os campos são obrigatórios')
    } else if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem')
    } else if (password.length !== 3) {
      setErrorMessage('A senha deve ter 3 dígitos')
    } else {
      try {
        const userId = uuid.v4()

        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO users (userId, name, login, password, gender) values (?, ?, ?, ?, ?)',
            [userId, name, login, password, gender],
            (_, resultSet) => {
              ToastAndroid.showWithGravityAndOffset(
                'Cadastro Realizado, faça Login',
                ToastAndroid.LONG,
                ToastAndroid.TOP,
                25,
                50,
              )
              setTimeout(() => navigation.replace('Login'), 1500)
            },
            (_, error) => {
              // Se ocorrer um erro, mostre uma mensagem
              console.error('Erro ao inserir usuário:', error)
              setErrorMessage('Erro ao criar usuário.')
            },
          )
        })
      } catch (error) {
        console.error('Erro ao criar usuário:', error)
        setErrorMessage('Erro ao criar usuário.')
      }
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.container}>
        <Animate.View
          style={styles.containerForm}
          delay={600}
          animation="fadeInUp"
        >
          <Text style={styles.textTitle}>Registro de novo acesso</Text>
          <TextInput
            placeholder="Digite seu nome"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
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
            keyboardType="numeric"
            maxLength={3}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholder="Confirme sua senha"
            style={styles.input}
            secureTextEntry
            keyboardType="numeric"
            maxLength={3}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione seu gênero" value="" />
            <Picker.Item label="Masculino" value="masculino" />
            <Picker.Item label="Feminino" value="feminino" />
            <Picker.Item label="Não binário" value="naobinario" />
          </Picker>
          {errorMessage ? (
            <Text style={styles.errorTextPicker}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity
            onPress={handleRegister}
            style={styles.buttonRegister}
          >
            <Text style={styles.textRegister}>Criar Conta</Text>
          </TouchableOpacity>
        </Animate.View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  containerForm: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#ffff',
    borderRadius: 25,
    padding: 16,
    margin: 24,
    borderColor: '#4d4d4d',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignSelf: 'center',
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
  buttonRegister: {
    backgroundColor: '#fff7ed',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
  picker: {
    height: 50,
    borderColor: '#4d4d4d',
    borderWidth: 0.5,
    borderRadius: 25,
    marginBottom: 12,
  },
  errorTextPicker: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
})

// import React, { useState } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
// } from 'react-native'
// import { Picker } from '@react-native-picker/picker'
// import * as Animate from 'react-native-animatable'
// import { useNavigation } from '@react-navigation/native'
// import { users } from '../constants/users'

// export default function CreateLogin() {
//   const navigation = useNavigation()
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [gender, setGender] = useState('')
//   const [errorMessage, setErrorMessage] = useState('')

//   const handleRegister = () => {
//     if (!name || !email || !password || !confirmPassword || !gender) {
//       setErrorMessage('Todos os campos são obrigatórios')
//     } else if (password !== confirmPassword) {
//       setErrorMessage('As senhas não coincidem')
//     } else if (password.length !== 3) {
//       setErrorMessage('A senha deve ter 3 dígitos')
//     } else {
//       const newUser = {
//         id: users.length + 1,
//         name,
//         login: email,
//         password,
//         gender,
//         admin: false,
//       }

//       users.push(newUser)

//       navigation.navigate('Login')
//     }
//   }
//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding">
//       <View style={styles.container}>
//         <Animate.View
//           style={styles.containerForm}
//           delay={600}
//           animation="fadeInUp"
//         >
//           <Text style={styles.textTitle}>Registro de novo acesso</Text>
//           <TextInput
//             placeholder="Digite seu nome"
//             style={styles.input}
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             placeholder="Digite seu e-mail"
//             style={styles.input}
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             placeholder="Digite sua senha"
//             style={styles.input}
//             secureTextEntry
//             keyboardType="numeric"
//             maxLength={3}
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TextInput
//             placeholder="Confirme sua senha"
//             style={styles.input}
//             secureTextEntry
//             keyboardType="numeric"
//             maxLength={3}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//           <Picker
//             selectedValue={gender}
//             onValueChange={(itemValue) => setGender(itemValue)}
//             style={styles.picker}
//           >
//             <Picker.Item label="Selecione seu gênero" value="" />
//             <Picker.Item label="Masculino" value="Masculino" />
//             <Picker.Item label="Feminino" value="Feminino" />
//             <Picker.Item label="Não binário" value="Não binário" />
//           </Picker>
//           {errorMessage ? (
//             <Text style={styles.errorTextPicker}>{errorMessage}</Text>
//           ) : null}
//           <TouchableOpacity
//             onPress={handleRegister}
//             style={styles.buttonRegister}
//           >
//             <Text style={styles.textRegister}>Criar Conta</Text>
//           </TouchableOpacity>
//         </Animate.View>
//       </View>
//     </KeyboardAvoidingView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff7ed',
//   },
//   containerLogo: {
//     flex: 2,
//   },
//   containerForm: {
//     position: 'absolute',
//     flex: 1,
//     backgroundColor: '#ffff',
//     borderRadius: 25,
//     padding: 16, // Use padding em vez de paddingStart e paddingEnd
//     margin: 24,
//     borderColor: '#4d4d4d',
//     borderWidth: 0.5,
//     justifyContent: 'space-between',
//   },
//   textTitle: {
//     fontSize: 24,
//     paddingVertical: 8,
//     fontWeight: 'bold',
//     color: '#4d4d4d',
//     marginBottom: 12,
//     marginTop: 24,
//     alignSelf: 'center',
//   },
//   input: {
//     borderColor: '#4d4d4d',
//     borderWidth: 0.5,
//     borderRadius: 25,
//     marginBottom: 12,
//     padding: 15,
//   },
//   buttonRegister: {
//     backgroundColor: '#fff7ed',
//     borderRadius: 50,
//     paddingVertical: 8,
//     width: '60%',
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 12,
//   },
//   picker: {
//     height: 50,
//     borderColor: '#4d4d4d',
//     borderWidth: 0.5,
//     borderRadius: 25,
//     marginBottom: 12,
//   },
//   errorTextPicker: {
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 12,
//   },
// })
