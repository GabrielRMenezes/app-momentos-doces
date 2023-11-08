import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import ListAllTransactions from '../components/ListTransaction'
import EditTransactionForm from '../components/EditTransactionForm'
import * as SQLite from 'expo-sqlite'
import { useNavigation } from '@react-navigation/native'

const db = SQLite.openDatabase('app.db')

export default function EditTransactions() {
  const navigation = useNavigation()
  const [currentUser, setCurrentUser] = useState(null)
  const [isTransactionFormVisible, setTransactionFormVisible] = useState(false)
  const [reversedMovements, setReversedMovements] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction)
    setIsEditModalVisible(true)
  }
  const fetchTransactions = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM transactions',
        [],
        (_, { rows }) => {
          const loadedTransactions = rows._array
          setReversedMovements(loadedTransactions.reverse())
        },
        (_, error) => {
          console.error('Erro ao buscar as transações:', error)
        },
      )
    })
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleTransactionUpdated = () => {
    fetchTransactions()
  }

  const handleTransactionDeleted = () => {
    fetchTransactions()
  }

  const handleGoBack = () => {
    navigation.navigate('Home')
  }

  const handleRefresh = () => {
    fetchTransactions()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Últimas movimentações</Text>
      <FlatList
        style={styles.movimentacoes}
        data={reversedMovements}
        keyExtractor={(item) => item.transactionId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ListAllTransactions
            data={item}
            onEditPress={handleEditTransaction}
          />
        )}
      />
      <EditTransactionForm
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        transaction={selectedTransaction}
        onTransactionUpdated={handleTransactionUpdated}
        onTransactionDeleted={handleTransactionDeleted}
      />
      <TouchableOpacity onPress={handleRefresh} style={styles.button}>
        <Text style={styles.textTitle}>Atualizar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoBack} style={styles.button}>
        <Text style={styles.textTitle}>Início</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7ed',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d4d4d',
    margin: 14,
  },
  values: {
    flexDirection: 'row',
  },
  movimentacoes: {
    marginStart: 14,
    marginEnd: 14,
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
  button: {
    backgroundColor: '#fff7ed',
    borderRadius: 50,
    margin: 4,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
