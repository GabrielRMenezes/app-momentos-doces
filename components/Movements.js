import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function Movements({ data }) {
  const [showValue, setShowValue] = useState(false)
  const valueColor = data.type === 'ganho' ? '#2ecc71' : '#e74c3c'
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setShowValue(!showValue)}
    >
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
