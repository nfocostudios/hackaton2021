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

const DistritoAlerta = () => {
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

    const [alto, setAlto] = useState(0)
    const [medio, setMedio] = useState(0)
    const [bajo, setBajo] = useState(0)
    const [distrito, setDistrito] = useState('')
    
    const __addMensaje = () => {
        setModalVisible(false)
    
    }
    
    useEffect(() => {
        const loadData = async () => {
            await firestore()
                .collection('distritos_alertas')
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

    const __openModal = (item) => {
        setModalVisible(true);

        setDistrito(item.nombre)
        setAlto(item.fuerte);
        setMedio(item.medio);
        setBajo(item.bajo);
        console.log(item);
    }

    
    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#eee', position: 'relative' }}>
                { messages && messages.map((item) => 
                    <TouchableHighlight style={[styles.item]} key = {item.key}  onPress={ () => __openModal(item)}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text p style={{color: '#000'}}>{item.nombre}</Text>
                            <Text p>{item.cantidad}</Text>
                        </View>
                    </TouchableHighlight>
                )}

            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.modalAlert}>
                    <View style={styles.modalAlertContent}>
                        <Text h6 bold center style={{marginBottom: 20}}>{distrito}</Text>
                        
                        <Block style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Block style={{ height: 15, width: '80%', backgroundColor: 'red', borderRadius: 10, marginRight: 10 }}></Block>

                            <Text>{alto}</Text>
                        </Block>
                        <Block style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Block style={{ height: 15, width: '50%', backgroundColor: '#ff8c00', borderRadius: 10, marginRight: 10 }}></Block>

                            <Text>{medio}</Text>
                        </Block>
                        <Block style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 50 }}>
                            <Block style={{ height: 15, width: '20%', backgroundColor: '#ffff00', borderRadius: 10, marginRight: 10 }}></Block>

                            <Text>{bajo}</Text>
                        </Block>
                        <Button
                            uppercase
                            size="small"
                            
                            color="info"
                            style={styles.registrar}
                            onPress={__addMensaje}
                        >
                            Cerrar
                        </Button>
                    </View>
                </View>
            </Modal>
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


export default DistritoAlerta;
