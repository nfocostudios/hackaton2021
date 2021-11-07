import React, { useState } from 'react';

import { View, StyleSheet, Alert } from  'react-native';
import { Text, Input, Button, Toast, theme, withGalio, GalioProvider  } from 'galio-framework';

const Login = ({ navigation }) => {
    const [isShow, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const __ingresar = () => {
        console.log('asdsdsd', email, password);

        navigation.navigate('Principal', { name: 'Jane' })
        // Alert.alert("Bienvenido ✅", "Logeado correctamente")

    }

    const __registrar = () => {
        navigation.navigate('Registrar', { name: 'Jane' })
    }

    return (
        <>
        <View style={{ flex: 1, backgroundColor: '#eee', paddingHorizontal: 20, position: 'relative', }}>
            <View style={styles.title}>
                <Text h4 color="#000" bold style={{textAlign:'center'}}>Inicia Sesión</Text>
            </View>

            <View>
                <Input 
                    placeholder="Usuario o Email" 
                    style={{ borderColor: theme.COLORS.INFO }} 
                    onChangeText={text => {
                        setEmail(text)
                    }}
                />
            </View>
            <View style={{ marginBottom:10 }}>
                <Input 
                placeholder="Contraseña" 
                style={{ borderColor: theme.COLORS.INFO }} 
                onChangeText={text => setPassword(text)}
                password 
                />
            </View>
            <View style={{ marginBottom: 30 }}>
                <Button 
                    uppercase
                    color="info"
                    size="large"
                    style={{ marginHorizontal: 0,  }}
                    onPress={__ingresar}
                >Ingresar</Button>
            </View>

            <View>
                <Button 
                    uppercase
                    size="large"
                    color="info"
                    style={styles.registrar}
                    onPress={__registrar}
                >Registrar</Button>
            </View>

            
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 90,
        marginBottom: 40
    },
    registrar: {
        marginHorizontal: 0, 
        opacity: 0.6,
    }
});

export default withGalio(Login);