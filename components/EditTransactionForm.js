/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native'
import CurrencyInput from 'react-native-currency-input'
import * as SQLite from 'expo-sqlite'
import * as Animate from 'react-native-animatable'
import { Picker } from '@react-native-picker/picker'

const db = SQLite.openDatabase('app.db')

export default function EditTransactionForm({
  isVisible,
  onClose,
  transaction,
  onTransactionUpdated,
  onTransactionDeleted,
}) {
  const [mode, setMode] = useState('')
  const [type, setType] = useState('')
  const [value, setValue] = useState('')
  const [source, setSource] = useState('')
  const [description, setDescription] = useState('')
  const [transactionId, setTransactionId] = useState(null)

  useEffect(() => {
    if (transaction) {
      setMode(transaction.mode)
      setType(transaction.type)
      setValue(transaction.value)
      setSource(transaction.source)
      setDescription(transaction.description)
      setTransactionId(transaction.transactionId)
    }
  }, [transaction])

  const handleUpdateTransaction = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE transactions SET mode = ?, type = ?, value = ?, source = ?, description = ? WHERE transactionId = ?',
        [mode, type, value, source, description, transactionId],

        (_, result) => {
          onTransactionUpdated()
          onClose()
        },
        (_, error) => {
          console.error('Erro ao atualizar a transação:', error)
        },
      )
    })
  }

  const handleDeleteTransaction = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM transactions WHERE transactionId = ?',
        [transaction.id],
        (_, result) => {
          onTransactionDeleted()
          onClose()
        },
        (_, error) => {
          console.error('Erro ao deletar a transação:', error)
        },
      )
    })
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <Animate.View
          style={styles.containerForm}
          delay={600}
          animation="fadeInUp"
        >
          <Text style={styles.textTitle}>Editar ou deletar uma Transação</Text>

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
            onPress={handleUpdateTransaction}
            style={styles.button}
          >
            <Text style={styles.textButton}>Atualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteTransaction}
            style={styles.button}
          >
            <Text style={styles.textButton}>Deletar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.textButton}>Cancelar</Text>
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
