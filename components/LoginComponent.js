import React, { Component } from 'react';
import { StatusBar, TextInput, Image, View, StyleSheet, Alert } from 'react-native'
import { Container, Content, Icon, Text } from 'native-base'
import { Button } from "react-native-elements"
import auth, { firebase } from "@react-native-firebase/auth"
import Style from '@Theme/Style'
import { addSessionName } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    sessions: state.sessions
  }
}

const mapDispatchToProps = dispatch => ({
  addSessionName: (name) => dispatch(addSessionName(name)),
})

class Login extends Component {
  static navigationOptions = {
    headerMode: "none"
  };
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: null,
      name: null
    }
  }



  handleLogin = () => {
    const { navigate } = this.props.navigation;
    const phone = this.state.phoneNumber;
    const name = this.state.name;

    if (phone && phone.length >= 10) {
      const withCountryCode = "+91" + phone;

      auth().signInWithPhoneNumber(withCountryCode).then((confirm) => {
        console.log("hereee");
        console.log({confirm});
        this.props.addSessionName(name);
        navigate("Loginotp", { confirm, name })
      }).catch((err) => {
        console.log("error sending otp aeohg");
        console.log(err);
        Alert.alert("Error", "Unable to send otp on this device")
      });
    }
    else {
      Alert.alert("Warning", "Enter valid phone number")
    }
  }


  render() {

    return <Container style={Style.bgMainIntro}>
      <StatusBar backgroundColor='#101E3D' animated barStyle='light-content' />

      <Content style={Style.layoutInner} contentContainerStyle={Styles.layoutContent}>

        <View style={Styles.loginBg}>
          <Image source={require('../assets/images/icon.png')} style={Styles.logoImg} />
          <Text style={Styles.logoText}>{'APP NAME'.toUpperCase()}</Text>
          <View>
            <Text style={Styles.textLabel}>{'Name'.toUpperCase()}</Text>
            <TextInput onChangeText={(text) => this.setState({ name: text })} style={Styles.textInput} />
            <Text style={Styles.textLabel}>{'Mobile No.'.toUpperCase()}</Text>
            <TextInput onChangeText={(text) => this.setState({ phoneNumber: text })} style={Styles.textInput} />
            <Button
              style={Styles.loginBtn}
              title={'Login'.toUpperCase()}
              onPress={this.handleLogin}
            />
          </View>
        </View>

      </Content>

    </Container>
  }
}

const Styles = StyleSheet.create({
  layoutContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  loginBg: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoImg: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  logoText: {
    color: '#F3BA1D',
    alignSelf: 'center',
    marginBottom: 30,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
  },
  textLabel: {
    color: '#FFF',
    fontSize: 13,
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#48556E',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#fff',
  },

  loginBtn: {
    width: '100%',
    backgroundColor: '#F3BA1D',
    borderRadius: 5,
    paddingVertical: 20,
  },
  loginBtnIcon: {
    color: '#101E3D',
    fontSize: 24,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);