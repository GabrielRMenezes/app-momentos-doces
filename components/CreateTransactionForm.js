import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native'
import * as Animate from 'react-native-animatable'
import uuid from 'react-native-uuid'
import CurrencyInput from 'react-native-currency-input'
import { openDatabase } from 'expo-sqlite'

const db = openDatabase('app.db')

export default function CreateTransactionForm({
  isVisible,
  onClose,
  onAddTransaction,
}) {
  const [mode, setMode] = useState('')
  const [type, setType] = useState('')
  const [value, setValue] = useState(0)
  const [source, setSource] = useState('')
  const [description, setDescription] = useState('')

  const handleAddTransaction = async () => {
    if (!mode || !type || !value || !source || !description) {
      console.error('Todos os campos são obrigatórios.')
      return
    }

    const transactionId = uuid.v4()
    const newTransaction = {
      transactionId,
      mode,
      type,
      value: parseFloat(value),
      source,
      description,
      date: new Date().toISOString(),
    }

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO transactions (transactionId, mode, type, value, date, source, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          newTransaction.transactionId,
          newTransaction.mode,
          newTransaction.type,
          newTransaction.value,
          newTransaction.date,
          newTransaction.source,
          newTransaction.description,
        ],
        () => {
          console.log('Transação inserida com sucesso!')
          onAddTransaction(newTransaction)
          onClose()
        },
        (error) => {
          console.error('Erro ao inserir a transação: ', error)
        },
      )
    })

    setMode('')
    setType('')
    setValue(0)
    setSource('')
    setDescription('')
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <Animate.View
          style={styles.containerForm}
          delay={600}
          animation="fadeInUp"
        >
          <Text style={styles.textTitle}>Adicionar Nova Transação</Text>

          <Picker
            style={styles.input}
            selectedValue={mode}
            value={mode}
            onValueChange={(itemValue) => setMode(itemValue)}
          >
            <Picker.Item label="Qual tipo de transação" value="" />
            <Picker.Item label="Crédito" value="credit" />
            <Picker.Item label="Débito" value="debit" />
            <Picker.Item label="Pix" value="pix" />
            <Picker.Item label="Dinheiro" value="dinheiro" />
          </Picker>
          <Picker
            style={styles.input}
            selectedValue={type}
            value={type}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="Entrada ou Saída?" value="" />
            <Picker.Item label="Entrada" value="ganho" />
            <Picker.Item label="Saída" value="gasto" />
          </Picker>
          <CurrencyInput
            style={styles.input}
            value={value}
            placeholder="Valor?"
            onChangeValue={setValue}
            prefix="R$"
            delimiter=","
            separator="."
            precision={2}
            onChangeText={(formattedValue) => {
              return formattedValue
            }}
          />
          <Picker
            style={styles.input}
            selectedValue={source}
            onValueChange={(itemValue) => setSource(itemValue)}
          >
            <Picker.Item label="Origem da transação" value="" />
            {type === 'ganho' ? (
              <Picker.Item label="Pedido" value="gasto" />
            ) : (
              <Picker.Item label="Material" value="ganho" />
            )}
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Descreva o pedido realizado ou a lista de materiais comprados"
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity
            onPress={handleAddTransaction}
            style={styles.button}
          >
            <Text style={styles.textTitle}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.textTitle}>Cancelar</Text>
          </TouchableOpacity>
        </Animate.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  containerForm: {
    position: 'absolute',
    flex: 2,
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
    fontSize: 21,
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
  button: {
    backgroundColor: '#fff7ed',
    borderRadius: 50,
    margin: 4,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
})
