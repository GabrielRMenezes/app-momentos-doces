import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function ListAllTransactions({ data, onEditPress }) {
  const [showValue, setShowValue] = useState(true)
  const valueColor = data.type === 'ganho' ? '#2ecc71' : '#e74c3c'
  const navigation = useNavigation()
  const openEditModal = () => {
    navigation.navigate('EditTransactionForm', { transaction: data })
  }
  return (
    <TouchableOpacity onPress={() => onEditPress(data)}>
      <View style={styles.container}>
        <Text style={styles.date}>{data.date}</Text>
        <View style={styles.content}>
          <Text style={styles.title}>{data.description}</Text>
          {showValue ? (
            <Text style={{ ...styles.value, color: valueColor }}>
              {data.type === 'ganho' ? `R$ ${data.value}` : `R$ -${data.value}`}
            </Text>
          ) : (
            <View style={styles.hideValue}></View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24,
    borderBottomColor: '#dadada',
  },
  date: {
    color: '#dadada',
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hideValue: {
    marginTop: 6,
    width: 80,
    height: 10,
    backgroundColor: '#dadada',
    borderRadius: 8,
  },
})
