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

import DatePicker from 'react-native-date-picker'

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const DatosPersonales = ({navigation}) => {
  const [isShow, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [image, setImage] = useState(
    'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
  );

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [cDate, setCDate] = useState(null)

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

  const __getDate = () => {
    setOpen(true)
    console.log('sdsd');
    
  }

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

        <Block style={{ marginBottom: 2 }}>
                <Input 
                    placeholder="Ingresa tu DNI" 
                    style={{ borderColor: theme.COLORS.INFO }} 
                    onChangeText={text => {
                        setEmail(text)
                    }}
                />
        </Block>
        <Block style={{ marginBottom: 2 }}>
                <Input 
                    placeholder="Ingresa tu nombre" 
                    style={{ borderColor: theme.COLORS.INFO }} 
                    onChangeText={text => {
                        setEmail(text)
                    }}
                />
        </Block>
        <Block style={{ marginBottom: 2 }}>
                <Input 
                    placeholder="Ingresa tus apellidos" 
                    style={{ borderColor: theme.COLORS.INFO }} 
                    onChangeText={text => {
                        setEmail(text)
                    }}
                />
        </Block>
        <Block style={{ marginBottom: 2, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button style={{ marginHorizontal: 0, marginRight: 20 }} onPress={() => setOpen(true)}>Fecha de nacimiento</Button>
                <Text h5>{cDate}</Text>

                
        </Block>
        <Block style={{ marginBottom: 2 }}>
                <Input 
                    placeholder="Numero de celular" 
                    style={{ borderColor: theme.COLORS.INFO }} 
                    onChangeText={text => {
                        setEmail(text)
                    }}
                />
        </Block>
        <Block style={{ marginBottom: 2 }}>
                <Input 
                    placeholder="Correo electrónico" 
                    style={{ borderColor: theme.COLORS.INFO }} 
                    onChangeText={text => {
                        setEmail(text)
                    }}
                />
        </Block>

        <Button 
            uppercase
            size="large"
            color="info"
            style={styles.registrar}
            onPress={__registrar}
        >Guardar Cambios</Button>
      </View>

      <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={(date) => {
                const dateFormat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
                console.log(date);
                setCDate(dateFormat);
                setOpen(false)
                setDate(date)
            }}
            onCancel={() => {
                setOpen(false)
            }}
        />
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

export default withGalio(DatosPersonales);
