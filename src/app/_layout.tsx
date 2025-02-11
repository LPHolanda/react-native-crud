import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Icon } from '@rneui/themed';
import { UsersProvider } from "../context/UsersContext";

export default function RootLayout() {
    return (
        <UsersProvider>
            <Stack
                initialRouteName='index'
                screenOptions={screenOptions}>
                <Stack.Screen 
                    name={'index'} 
                    initialParams={{ user: 1 }}
                    options={({ navigation }) => {
                        return {
                            title: 'Lista de usuários',
                            headerRight: () => (
                                <Button
                                    type='clear'
                                    icon={<Icon name='add' size={25} color='white' />}
                                    onPress={() => navigation.navigate('userForm')}
                                >

                                </Button>
                            )
                        }
                    }} 
                />
                <Stack.Screen 
                    name={'userForm'} 
                    options={{ 
                        title: 'Formulário de usuários' 
                    }} 
                />
            </Stack>
            <StatusBar style="dark" />
        </UsersProvider>
    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
}