import { Avatar, Button, Icon, ListItem } from '@rneui/themed';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { users } from '../data/users';
import { User } from '../models/User';
import { useNavigation } from '@react-navigation/native';

export default function UserList() {
    const navigation = useNavigation();

    function confirmUserDeletion(user: User) {
        Alert.alert('Excluir usuário', 'Deseja excluir o usuário?', [
            {
                text: 'Sim',
                onPress() {
                    console.warn('delete', user.id)
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
                    onPress={() => navigation.navigate('userForm' as never, user as never)}
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
                onPress={() => navigation.navigate('userForm' as never, user as never)} //as never é pra suprimir um erro do react navigation com typescript
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
                data={users}
                renderItem={(user) => getUserItem(user.item)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    
});
