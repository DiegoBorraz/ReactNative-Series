import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import firebase from 'firebase';

import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            message: ''
        }
    }
    componentDidMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyAt1jqwo0Pq4IG8MJOPJrPF-VE_RxhcvzA",
            authDomain: "series-e8172.firebaseapp.com",
            databaseURL: "https://series-e8172.firebaseio.com",
            projectId: "series-e8172",
            storageBucket: "series-e8172.appspot.com",
            messagingSenderId: "56815468163",
            appId: "1:56815468163:web:f9a9637488ea0b901265b6",
            measurementId: "G-6ZSLB1T1W5"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        
    }

    /*
        Como o setState() não sabe o que esta recebendo é usado essa propriedade [] 
        que assume o que esta sendo passado pelo parâmetro field e em seguida recebe o value
        Uma forma pratica caso queira criar outros inputs
    */
    onChangeHandler(field, value){
        this.setState({
            [field]: value
        })
    }
    tryLogin(){
        this.setState({ isLoading: true, message: '' })
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(user => {
            this.setState({ message: 'Sucesso!!' });
        })
        .catch(error => {
            this.setState({ message: this.getMessageByErrorCode(error.code) });
        })
        .then(() => this.setState({ isLoading: false }));
    }

    renderButton(){
        if(this.state.isLoading){
            return <ActivityIndicator size='large' />
        }
        return(
            <Button 
            title="Entrar" 
            onPress={() => this.tryLogin()} />
        );
    }

    getMessageByErrorCode(errorCode){
        switch(errorCode) {
            case 'auth/invalid-email':
                return 'Email invalido!'
            case 'auth/wrong-password':
                return 'Password invalido!'
            case 'auth/user-not-found':
                return 'Usuário não encontrado!'
            case 'auth/internal-error':
                return 'Problema de conexão!'
            default:
                return 'Problema desconhecido!'
        }

        
    }

    renderMessage(){
        const { message } = this.state;
        if(!message){
            return null;
        }
        return (
            <View>
                <Text>{ message }</Text>
            </View>
        )
    }

    render() {
        return (
            /* La no style do <FormRow/> será verificado se first ou last são true ou não para setar um estilo novo*/
            <View style={styles.container}>
                <FormRow first> 
                    <TextInput 
                    style={styles.input} 
                    placeholder= "Email" 
                    value={this.state.email}
                    onChangeText={value =>this.onChangeHandler('email', value)}  />
                </FormRow>
                <FormRow last> 
                    <TextInput 
                    style={styles.input} 
                    placeholder= "Senha" 
                    value={this.state.password} 
                    onChangeText={value =>this.onChangeHandler('password', value)}
                    secureTextEntry  />
                </FormRow>
                { this.renderButton() }
                { this.renderMessage() }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10
    },
    input: {
        paddingLeft:5,
        paddingRight: 5,
        paddingBottom:5,

    }
})