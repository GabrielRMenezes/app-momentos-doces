import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'

const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 22
  : 64

export default function Header({ name, gender, onAddTransaction }) {
  const [isModalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const handleAddTransaction = () => {
    toggleModal()
    onAddTransaction()
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View flexDirection="column">
          <Text style={styles.username}>
            Bem-vind
            {gender === 'masculino' ? 'o' : gender === 'feminino' ? 'a' : 'e'},
          </Text>
          <Text style={styles.username}>{name}</Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.menuTitle}>Selecione uma opção</Text>
          <TouchableOpacity onPress={handleAddTransaction}>
            <Text style={styles.menuContent}>Criar Transação</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditTransaction')}
          >
            <Text style={styles.menuContent}>Editar Transação</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.menuContent}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff7ed',
    paddingTop: statusBarHeight,
    flexDirection: 'row',
    paddingBottom: 30,
    paddingStart: 16,
    paddingEnd: 16,
  },
  logo: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d4d4d',
  },
  modalContent: {
    backgroundColor: '#ffff',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d4d4d',
  },
  menuContent: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#4d4d4d',
  },
})
