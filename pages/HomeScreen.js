import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Balance from '../components/Balance'
import Movements from '../components/Movements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CreateTransactionForm from '../components/CreateTransactionForm'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('app.db')

export default function HomeScreen() {
  const [currentUser, setCurrentUser] = useState(null)
  const [isTransactionFormVisible, setTransactionFormVisible] = useState(false)
  const [reversedMovements, setReversedMovements] = useState([])

  const showTransactionForm = () => {
    setTransactionFormVisible(true)
  }
  const editTransactions = () => {
    console.log('Editar transações')
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
  const fetchUser = async () => {
    const userId = await AsyncStorage.getItem('userId')
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name, gender FROM users WHERE userId = ?',
        [userId],
        (_, { rows }) => {
          if (rows.length > 0) {
            setCurrentUser(rows._array[0])
          }
        },
        (_, error) => {
          console.error('Erro ao buscar informações do usuário:', error)
        },
      )
    })
  }
  useEffect(() => {
    fetchUser()
    fetchTransactions()
  }, [])

  const handleAddTransaction = (newTransaction) => {
    console.log('Nova transação:', newTransaction)
  }

  return (
    <View style={styles.container}>
      <Header
        name={currentUser?.name}
        gender={currentUser?.gender}
        onAddTransaction={showTransactionForm}
        onEditTransactions={editTransactions}
      />
      <Balance data={reversedMovements} />
      <Text style={styles.title}>Últimas movimentações</Text>
      <FlatList
        style={styles.movimentacoes}
        data={reversedMovements}
        keyExtractor={(item) => item.transactionId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Movements data={item} />}
      />
      <CreateTransactionForm
        isVisible={isTransactionFormVisible}
        onClose={() => setTransactionFormVisible(false)}
        onAddTransaction={handleAddTransaction}
      />
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
})
