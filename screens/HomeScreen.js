import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { Loading } from "../components/LoadingComponent"
import { addSessionName } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { firebase } from "@react-native-firebase/auth"
import io from 'socket.io-client';
const socket = io.connect('http://192.168.43.58:4443', {transports: ['websocket']});

let username;
let busy = false
let incallwith = ""

const mapStateToProps = state => {
  return {
    profiles: state.profiles,
    sessions: state.sessions
  }
}

const mapDispatchToProps = dispatch => ({
  addSessionName: (name) => dispatch(addSessionName(name)),
})

function onLogin(data){
  if (data.success === false) {
 } else {
     //var loginContainer = document.getElementById('loginContainer');
     //loginContainer.parentElement.removeChild(loginContainer);
     username = data.username;
     console.log("Login Successfull");
     console.log("logged in as :"+username);
  }
}

function callAccept(data){
  console.log("call accepted");
  console.log("room_id_1");
  console.log(data.callername+"_"+data.name);
  // code
  socket.send({
       type: "call_accepted",
       callername: data.callername,
       from: username
      })
}
function callReject(data){
    console.log("call rejected");
    socket.send({
           type: "call_rejected",
           callername: data.callername,
           from: username
    })
    busy = false
    incallwith = ""
}
function onAnswer(data){
        if(busy == false){
            busy = true
            incallwith = data.callername
            //var res = confirm(data.callername+" is calling you");
            Alert.alert(
              'Incoming Call',
              data.callername+" is calling you",
              [
                {text: 'Cancel', onPress: () => callReject(data), style: 'cancel'},
                {text: 'OK', onPress: () => callAccept(data) },
              ],
              { cancelable: false }
            )

             }else{
                 console.log("call busy");
                 //this.setState({ callResponse: "Call accepted by :"+ data.responsefrom })
                 socket.send({
                        type: "call_busy",
                        callername: data.callername,
                        from: username
                 })

             }
}
function onResponse(data){
                switch(data.response){
                    case "accepted":
                    incallwith = data.responsefrom;
                    Alert.alert(
                      'Incoming Call',
                      "Call accepted by "+ data.responsefrom,
                      [
                        {text: 'OK', onPress: () =>console.log("ahieg") },
                      ],
                      { cancelable: false }
                    )
                    console.log({ callResponse: "Call accepted by "+ data.responsefrom })
                    // code
                    break;
                    case "rejected":
                    console.log({ callResponse: "Call rejected by "+ data.responsefrom })
                    busy = false;
                    incallwith = ""
                    break;
                    case "busy":
                    console.log({ callResponse: data.responsefrom+" call busy" })
                    busy = false;
                    incallwith = ""
                    break;
                    default:
                    console.log({ callResponse: data.responsefrom+" is offline" })
                    busy = false;
                    incallwith = ""
                }

}
socket.on('roommessage', function(message){
            var data = message;
            switch(data.type) {
                 case "login":
                        console.log("New user : "+data.username);
                        break;
                 case "disconnect":
                   console.log("User disconnected : "+data.username);
                 break;
                default:
                    break;
            }
        })
socket.on('message', function(message){
            var data = message;
            console.log({ callResponse: "" })
            switch(data.type) {
                 case "login":
                        onLogin(data);
                        break;
                case "answer":
                      console.log("getting called");
                        onAnswer(data);
                        break;
                case "call_response":
                        onResponse(data);
                      break;
                default:
                    break;
            }
    })

function HomeScreen(props) {
  useEffect(() => {
    console.log("__here____here__aegj;_ahego");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.phoneNumber);
        // username = user.phoneNumber;
        socket.send({
          type: "login",
          name: user.phoneNumber
             })
      }
    });   
  }, []);

  function callUser(incallwith){
    busy = true;
    console.log("calling user")
    console.log(username);
    console.log(incallwith)
    socket.send({
     type: "call_user",
     name: "+"+incallwith.trim(),
     callername: username
   })
  }

  if (props.profiles.isLoading) {
    return <Loading text="Loading" />
  }
  else {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={props.profiles.profiles}
          renderItem={({ item }) => (
            <ListItem
              topDivider
              title={item.name}
              subtitle={
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Icon
                      raised
                      name='call'
                      color='blue'
                      onPress={() => callUser(item.phone)} />
                  </View>
                </View>
              }
              bottomDivider
              chevron
            />
          )}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);