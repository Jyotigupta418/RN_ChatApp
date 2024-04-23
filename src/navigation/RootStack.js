import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from './routes'
import Splash from '../screens/Splash'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Home from '../screens/Home'
import Chats from '../screens/tabScreens/Chats'
import Setting from '../screens/tabScreens/Setting'
import Messages from '../screens/Messages'

const RootStack = () => {
    const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={ROUTES.SPLASH} component={Splash}/>
            <Stack.Screen name={ROUTES.LOGIN} component={Login}/>
            <Stack.Screen name={ROUTES.SIGNUP} component={Signup}/>
            <Stack.Screen name={ROUTES.HOME} component={Home}/>
            <Stack.Screen name={ROUTES.CHATS} component={Chats}/>
            <Stack.Screen name={ROUTES.SETTING} component={Setting}/>
            <Stack.Screen name={ROUTES.MESSAGES} component={Messages}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack