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
    ToastAndroid
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

const MensajesPredeterminados = () => {
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
            // useEffect(() => {
            await firestore()
                .collection('default_messages')
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
            // }, []);

        }

        loadData();
    }, []);

    
    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#eee', position: 'relative' }}>
                { messages && messages.map((item) => 
                    <TouchableHighlight style={[styles.item, {backgroundColor: item.color}]} key = {item.key}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text h6 style={{color: '#000'}}>{item.title}</Text>

                        </View>
                    </TouchableHighlight>
                )}

            </View>

            <View>
                <Button
                    uppercase
                    size="large"
                    color="info"
                    style={styles.registrar}
                    onPress={__openModal}
                >
                    Agregar
                </Button>

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
                        <Text h6 bold center>Crear mensaje</Text>
                        <Input 
                            placeholder="Mensaje" 
                            style={{ borderColor: theme.COLORS.INFO }} 
                            onChangeText={text => {
                                setMensaje(text)
                            }}
                        />

                        <Picker
                            selectedValue={colorSelected}
                            style={styles.select}
                            onValueChange={(itemValue, itemIndex) =>
                                setColorSelected(itemValue)
                            }>
                            <Picker.Item label="Seleccione" value="" />
                            {colores.map((item, key) => (
                            <Picker.Item key={key} label={item.name} value={item.code} />
                            ))}
                        </Picker>

                        <Button
                            uppercase
                            size="small"
                            
                            color="info"
                            style={styles.registrar}
                            onPress={__addMensaje}
                        >
                            Agregar
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


export default MensajesPredeterminados;
