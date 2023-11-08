import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../pages/HomeScreen'
import Login from '../pages/LoginScreen'
import CreateLogin from '../pages/CreateLoginFormScreen'
import EditTransaction from '../pages/EditTransactionScreen'

const Stack = createNativeStackNavigator()

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={CreateLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditTransaction"
        component={EditTransaction}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
