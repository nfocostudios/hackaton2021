import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    TouchableHighlight,
    Modal,
    Alert,
    ToastAndroid,
    Linking 
  } from 'react-native';
import {
    Text,
    Input,
    Button,
    Toast,
    theme,
    withGalio,
    GalioProvider,
    Block,
  } from 'galio-framework';
import firestore from '@react-native-firebase/firestore';

import {Picker} from '@react-native-picker/picker';

const ContactoEmergencia = () => {
    const [messages, setMessages] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [colores] = useState([
        {
            code: '#ff0000',
            name: 'Rojo'
        },
        {
            code: '#008000',
            name: 'Amarillo'
        },
        {
            code: '#ff8c00',
            name: 'Naranja'
        },
        {
            code: '#008000',
            name: 'Verde'
        }
    ]);

    const [colorSelected, setColorSelected] = useState('#ff0000');
    const [mensaje, setMensaje] = useState('');
    const __openModal = () => {
        setModalVisible(true);
    }
    
    const __addMensaje = () => {
        setModalVisible(false)
        firestore()
        .collection('default_messages')
        .add({
            title: mensaje,
            color: colorSelected
        })
        .then((resp) => {
            
  
            ToastAndroid.showWithGravityAndOffset(
                'Agregado correctamente',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50)
          });
    }
    
    useEffect(() => {
        const loadData = async () => {
            await firestore()
                .collection('contactos')
                .onSnapshot((querySnapshot) => {
                    const messages = []
                    querySnapshot.forEach((documentSnapshot) => {

                        messages.push({
                            key: documentSnapshot.id,
                            ...documentSnapshot.data()
                        })
                    })

                    setMessages(messages)
                })

        }

        loadData();
    }, []);

    
    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#eee', position: 'relative' }}>
                { messages && messages.map((item) => 
                    <TouchableHighlight style={[styles.item]} key = {item.key}  onPress={() => Linking.openURL(`tel:${item.telefono}`)}>
                        <View>
                            <Text h6 style={{color: '#000'}}>{item.nombre}</Text>
                            <Text p>{item.telefono}</Text>
                        </View>
                    </TouchableHighlight>
                )}

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    modalAlert: {
        position: 'absolute',
        top: 0,
        height: '100%',
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.5)',
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalAlertContent: {
        backgroundColor: '#fff',
        width: 300,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    select: {

    }
})


export default ContactoEmergencia;
