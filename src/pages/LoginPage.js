import React from 'react';
import { View,  TextInput, StyleSheet, Button } from 'react-native';

import FormRow from '../components/FormRow';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
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
                <Button title="Entrar" onPress={() => this.tryLogin()} />
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