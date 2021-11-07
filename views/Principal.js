import React, {useState} from 'react';

import {View, StyleSheet, ImageBackground, TouchableHighlight, ScrollView } from 'react-native';
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

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Principal = ({navigation}) => {
  const [isShow, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [image, setImage] = useState(
    'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
  );

  

  const __uploadImage = () => {
    console.log('asdsdsd', email, password);

    const options = {
        mediaType: 'photo',
        includeBase64: true
      };

      launchImageLibrary(options, (response) => {
        // console.log(response);
        // if (response.didCancel) {
        //   console.log('User cancelled image picker');
        // } else if (response.error) {
        //   console.log('ImagePicker Error: ', response.error);
        // } else if (response.customButton) {
        //   console.log('User tapped custom button: ', response.customButton);
        // } else {
        //   // You can also display the image using data:
        // //   const source = {uri: 'data:image/jpeg;base64,' + response.data};
  
        // //   setUpload(source);
        // //   setDataUpload(response);
        // }
      });
  };

  const __registrar = () => {
    console.log('asdsdsd');

    Alert.alert('Bienvenido ✅', 'Logeado correctamente');
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#eee',
          paddingHorizontal: 20,
          position: 'relative',
        }}>
        <View style={styles.imageProfile}>
          <ImageBackground
            source={{
              uri: image,
            }}
            imageStyle={styles.imageProfileContent}
            style={{width: 140, height: 140}}
          />
          <Button
            onlyIcon
            icon="tags"
            iconFamily="antdesign"
            iconSize={30}
            color="warning"
            iconColor="#fff"
            style={{width: 40, height: 40, position: 'absolute', bottom: 0, right: 100}}
            onPress={__uploadImage}
            >
            warning
          </Button>
        </View>

        <Block style={{ marginBottom: 20 }}>
            <Text h6 bold>María Antonieta de las Nieves</Text>
            <Text p>Registrado desde: 07/08/2021</Text>
        </Block>
        <ScrollView>
        <Block style={styles.contentMenu}>
            <TouchableHighlight style={styles.blockmenu} onPress={() => navigation.navigate('DatosPersonales')}>
                
                <Text p bold center>Datos personales</Text>
            </TouchableHighlight>
            
            <TouchableHighlight style={styles.blockmenu} onPress={() => navigation.navigate('ContactoEmergencia')}>
                
                <Text p bold center>Contactos de emergencia</Text>
            </TouchableHighlight>
        </Block>

        <Block style={styles.contentMenu}>
            <TouchableHighlight style={styles.blockmenu} onPress={() => navigation.navigate('MensajesPredeterminados')}>
                
                <Text p bold center>Mensajes predeterminados</Text>
            </TouchableHighlight>
            
            <TouchableHighlight style={styles.blockmenu}  onPress={() => navigation.navigate('DistritoAlerta')}>
                
                <Text p bold center>Distritos con mas alertas</Text>
            </TouchableHighlight>
        </Block>

        <Block style={styles.contentMenu}>
            <TouchableHighlight style={styles.blockmenu} onPress={() => navigation.navigate('MapaCalor')}>
                
                <Text p bold center>Mapa de calor</Text>
            </TouchableHighlight>
            
            <TouchableHighlight style={styles.blockmenu} onPress={() => navigation.navigate('EstamosContigo')}>
                
                <Text p bold center>¡Estamos contigo!</Text>
            </TouchableHighlight>
        </Block>

        <Block style={styles.contentMenu}>
            <TouchableHighlight style={styles.blockmenu} onPress={() => navigation.navigate('Vistazo')}>
                
                <Text p bold center>Dale un vistazo a todo lo que puedes hacer</Text>
            </TouchableHighlight>
        </Block>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 90,
    marginBottom: 40,
  },
  registrar: {
    marginHorizontal: 0,
    opacity: 0.6,
  },
  imageProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  imageProfileContent: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#999',
  },
  blockmenu: {
      backgroundColor: '#fff',
      width: '48%',
      height: 150,
      borderRadius: 20,
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        paddingHorizontal: 10,
        paddingVertical: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
  },
  contentMenu: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      paddingHorizontal: 5
  }
});

export default withGalio(Principal);
