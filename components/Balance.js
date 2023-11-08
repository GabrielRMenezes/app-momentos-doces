import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Balance({ data }) {
  let totalGasto = 0
  let totalGanho = 0
  const parseValue = (value) => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(',', '.'))
    } else if (typeof value === 'number') {
      return value
    } else {
      return 0
    }
  }

  data.forEach((movement) => {
    const valor = parseValue(movement.value)
    if (movement.type === 'gasto') {
      totalGasto += valor
    } else if (movement.type === 'ganho') {
      totalGanho += valor
    }
  })
  const total = totalGanho - totalGasto
  const balanceColor = total > 0 ? '#2ecc71' : '#e74c3c'

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Entrada</Text>
        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.gains}>{totalGanho}</Text>
        </View>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Saída</Text>
        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.expenses}>-{totalGasto}</Text>
        </View>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Balanço</Text>
        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={{ ...styles.balance, color: balanceColor }}>
            {total}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingStart: 18,
    paddingEnd: 18,
    marginTop: -24,
    marginStart: 14,
    marginEnd: 14,
    borderRadius: 4,
    paddingTop: 22,
    paddingBottom: 22,
    zIndex: 99,
  },
  itemTitle: {
    fontSize: 20,
    color: '#dadada',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    color: '#dadada',
    marginRight: 6,
  },
  gains: {
    fontSize: 22,
    color: '#2ecc71',
  },
  expenses: {
    fontSize: 22,
    color: '#e74c3c',
  },
  balance: {
    fontSize: 22,
  },
})
