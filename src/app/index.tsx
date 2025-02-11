import { Avatar, Button, Icon, ListItem } from '@rneui/themed';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { users } from '../data/users';
import { User } from '../models/User';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import UsersContext from '../context/UsersContext';

export default function UserList() {
    const router = useRouter();
    const ctx = useContext(UsersContext); // destructuring só pode ser feito em objetos que não podem ser nulos

    function confirmUserDeletion(user: User) {
        Alert.alert('Excluir usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    ctx?.dispatch({
                        type: 'deleteUser',
                        payload: user
                    })
                }
            },
            {
                text: 'Não'
            }
        ])
    }

    function getActions(user: User) {
        return (
            <>
                <Button
                    onPress={() => router.navigate({ pathname: '/userForm', params: user })}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange" />}
                />
                <Button
                    onPress={() => confirmUserDeletion(user)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red" />}
                />
            </>
        )   
    }

    function getUserItem(user: User) {
        return (
            <ListItem
                key={user.id}
                bottomDivider
                onPress={() => router.navigate({ pathname: '/userForm', params: user })}
            >
                <Avatar 
                    rounded
                    source={{ uri: user.avatarUrl }}
                />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(user)}
            </ListItem>
        )
    }
    
    return (
        <View>
            <FlatList 
                keyExtractor={user => user.id.toString()}
                data={ctx?.state.users}
                renderItem={(user) => getUserItem(user.item)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    
});
