import React, { Component } from 'react';
import { StatusBar, TextInput, View, StyleSheet, Alert } from 'react-native'
import { Container, Header, Content, Text } from 'native-base'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '@Theme/Style'
import OTPTextInput from 'react-native-otp-textinput';

class Loginotp extends Component {

  state = {
    code: null
  }

  confirmCode = () => {
    const { confirm } = this.props.route.params

    const name = this.props.route.name;
    console.log("LOGIN NAME");
    console.log(name);

    const code = this.state.code;
    const confirmation = confirm

    if (confirmation && code && code.length >= 6) {
      confirmation.confirm(code).then((result) => {
        if (result)
          this.props.navigation.navigate("Root")
      }).catch((err) => {
        Alert.alert("Error in confirmation")
      });

    } else {
      Alert.alert("Warning", "Enter valid otp")
    }

  }

  render() {
    var { navigate, replace } = this.props.navigation

    return <Container style={Style.bgMainIntro}>
      <Header style={Style.navigation}>
        <StatusBar backgroundColor='#101E3D' animated barStyle='light-content' />

        <View style={Style.actionBarLeft}>
          <Button
            buttonStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)' }}
            titleStyle={Style.loginBtnText}
            iconContainerStyle={Style.textWhite}
            onPress={() => {
              navigate("Login")
            }}
            icon={
              <Icon
                name="arrow-left"
                size={15}
                color="white"
              />
            }
            iconRight
          />
        </View>
        <View style={Style.actionBarMiddle}>
          <Text style={Style.actionBarText}>{'Verification'.toUpperCase()}</Text>
        </View>
        <View style={Style.actionBarRight} />
      </Header>

      <Content style={Style.layoutInner} contentContainerStyle={Styles.layoutContent}>

        <View style={Styles.loginBg}>
          <Text style={Styles.title}>We sent you a code to verify your mobile number</Text>
          <Text style={Styles.subTitle}>Enter your OTP Code here</Text>
          <View>
         {/* <OTPInputView
              style={{ height: 200 }}
              pinCount={6}

              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              codeInputFieldStyle={Style.underlineStyleBase}
              codeInputHighlightStyle={Style.underlineStyleHighLighted}
              onCodeFilled={(code => {
                this.setState({ code })
              })}
            /> */}
          <OTPTextInput handleTextChange={(code)=>{this.setState({ code })}} textInputStyle={{color: "white"}} inputCount={6} ref={e => (this.otpInput = e)} />

            <Button
              buttonStyle={Styles.loginBtn}
              titleStyle={Styles.loginBtnText}
              onPress={this.confirmCode.bind(this)}
              icon={
                <Icon
                  name="arrow-right"
                  size={15}
                  color="black"
                />
              }
              iconRight
              title={'Submit'.toUpperCase()}
            />
          </View>
          <Text style={Styles.text}>I didn't receive a code!</Text>
          <Text style={Styles.textLink}>Resend Code</Text>
        </View>

      </Content>

    </Container>
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '60%',
  },
  textInput: {
    height: 40,
    width: '80%',
    borderColor: '#000',
    borderWidth: 1,
    padding: 0,
    fontSize: 16,
    letterSpacing: 5,
    marginBottom: 0,
    textAlign: 'center',
  },
  buttonStyle: {
    marginHorizontal: 20,
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
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
    paddingHorizontal: 0,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 50,
  },
  subTitle: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
  },
  textInputGroup: {
    flexDirection: 'row',
  },
  textInput: {
    backgroundColor: '#48556E',
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 2,
    justifyContent: 'space-between',
    flexGrow: 1,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: '#FFF',
  },


  loginBtn: {
    width: '100%',
    backgroundColor: '#F3BA1D',
    borderRadius: 5,
    paddingVertical: 15,
  },
  loginBtnText: {
    color: '#101E3D',
    fontSize: 14,
  },
  loginBtnIcon: {
    color: '#101E3D',
    fontSize: 24,
  },

  text: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 5,
  },
  textLink: {
    color: '#F3BA1D',
    textAlign: 'center',
    fontSize: 13,
  },
});

export default Loginotp