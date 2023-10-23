import { StatusBar } from 'expo-status-bar'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import Balance from '../components/Balance'
import Movements from '../components/Movements'
import { lastMovements } from '../constants/moviments'
import { users } from '../constants/users'
import * as Icon from 'react-native-feather'

export default function Home() {
  const user = users
  const reversedMovements = [...lastMovements].reverse()
  return (
    <View style={styles.container}>
      <Header name="Gabriel" gender="masculino" />
      <Balance data={reversedMovements} />
      <Text style={styles.title}>Últimas movimentações</Text>
      <FlatList
        style={styles.movimentacoes}
        data={reversedMovements}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Movements data={item} />}
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
