import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { User } from '../models/User';
import { useNavigation } from '@react-navigation/native';

type Props = {
    // navigation: any,
    // route: any,
    user: User
}

export default function UserForm(props: Props) {
    console.log('props.user', props.user)
    const navigation = useNavigation();
    const [user, setUser] = useState<User>();

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
                    navigation.goBack();
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