import { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { User } from '../models/User';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import UsersContext from '../context/UsersContext';

export default function UserForm() {
    const router = useRouter();
    const ctx = useContext(UsersContext);
    const localParams = useLocalSearchParams<{ id: string, name: string, email: string, avatarUrl: string }>();
    const [user, setUser] = useState<User>({ ...localParams, id: +localParams.id }); //casting do id de string para number

    return (
        <View style={styles.form}>
            <Text>Nome</Text>
            <TextInput 
                style={styles.input}
                onChangeText={name => setUser({ ...user, name })}
                placeholder='Informe o nome'
                value={user?.name}
            />
            <Text>Email</Text>
            <TextInput 
                style={styles.input}
                onChangeText={email => setUser({ ...user, email })}
                placeholder='Informe o email'
                value={user?.email}
            />
            <Text>Url do avatar</Text>
            <TextInput 
                style={styles.input}
                onChangeText={avatarUrl => setUser({ ...user, avatarUrl })}
                placeholder='Informe a URL do avatar'
                value={user?.avatarUrl}
            />
            <Button
                title="Salvar"
                onPress={() => {
                    ctx?.dispatch({
                        type: user.id ? 'updateUser' : 'createUser',
                        payload: user,
                    })
                    router.back();
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: 12,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    }
});