import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
    TouchableHighlight,
    Modal
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

const MensajesPredeterminados = () => {
    const [messages, setMessages] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const __openModal = () => {
        console.log('asdsd');
        setModalVisible(true);
    }
    
    useEffect(() => {
        const loadData = async () => {
            // useEffect(() => {
            await firestore()
                .collection('default_messages')
                .get()
                .then((querySnapshot) => {
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
                    <TouchableHighlight style={styles.item} key = {item.key}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text h6>{item.title}</Text>
                            <View style={{ backgroundColor: item.color, height: 30, width: 30, borderRadius: 50 }}>
                            </View>

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
                        <Input 
                            placeholder="Usuario o Email" 
                            style={{ borderColor: theme.COLORS.INFO }} 
                            onChangeText={text => {
                                setEmail(text)
                            }}
                        />

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
})


export default MensajesPredeterminados;
