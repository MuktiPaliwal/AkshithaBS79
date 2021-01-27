import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import db from '../config'
import firebase from 'firebase'



export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      isModalVisible : false,
      firstName:'',
      lastName: '',
      contact:'',
      address: '',
      confirmPassword:'',
    };
  }
  
userSignUP=(emailId,password,confirmPassword)=>{
  if(password !== confirmPassword){
    console.log("passwords dont match");
    return Alert.alert("passwords dont match");
  }else {
firebase.auth().createUserWithEmailAndPassword(emailId,password).then((Response)=>{
  db.collection("users").add({
    first_name: this.state.firstName,
    last_name : this.state.lastName,
    contact: this.state.contact,
    email_id: this.state.emailId,
    address: this.state.address
  })
  console.log("Sign up successful")
  return  Alert.alert(
    'User Added Successfully',
    '',
    [
      {text: 'OK', onPress: () => this.setState({isModalVisible : false})},
    ]
);

}).catch(function(error){
  var errorCode=error.code
  var errorMessage=error.message
  console.log(errorMessage)

  return Alert.alert(errorMessage)
  })
}
}
userLogin=(emailId,password)=>{
  firebase.auth().signInWithEmailAndPassword(emailId,password).then(()=>{
    console.log("Login successful");
    this.props.navigation.navigate('DonateBooks')
    //return Alert.alert("User Created Succesfully")
  }).catch(function(error){
    var errorCode=error.code
    var errorMessage=error.message
    console.log(errorMessage)

   return Alert.alert(errorMessage)
    })
}

showModal = ()=>{
  return(
    <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
            <Text  style={styles.modalTitle}>Registration</Text>
            
            <TextInput
            style={styles.formTextInput}
            placeholder = "First Name"
            maxLength = {8}
            onChangeText = {(text)=>{
              this.setState({
                firstName:text
              })
            }}
            />
            <TextInput
            style={styles.formTextInput}
            style={styles.formTextInput}
            placeholder = "Last Name"
            maxLength = {8}
            onChangeText = {(text)=>{
              this.setState({
                lastName:text
              })
            }}
            />
            <TextInput
            style={styles.formTextInput}
            placeholder = "Contact"
            maxLength = {10}
            keyboardType={'numeric'}
            onChangeText = {(text)=>{
              this.setState({
                contact:text
              })
            }}
            />
            <TextInput
            style={styles.formTextInput}
            placeholder = "Address"
            multiline = {true}
            onChangeText = {(text)=>{
              this.setState({
                address:text
              })
            }}/>
            <TextInput
            style={styles.formTextInput}
            placeholder = "Email"
            keyboardType = "email-address"
            onChangeText = {(text)=>{
              this.setState({
                emailId:text
              })
            }}
            />
            <TextInput
            style={styles.formTextInput}
            placeholder = "Password"
            secureTextEntry = {true}
            onChangeText = {(text)=>{
              this.setState({
                password:text
              })
            }}
            />
            <TextInput
            style={styles.formTextInput}
            placeholder = "Confirm Password"
            secureTextEntry = {true}
            onChangeText = {(text)=>{
              this.setState({
                confirmPassword:text
              })
            }}/>
            
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                 style={styles.registerButton}
               onPress={()=>{
                this.userSignUP(this.state.emailId,this.state.password, this.state.confirmPassword)
              }}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBackButton}>
              <TouchableOpacity
              style={styles.cancelButton}
              onPress = {()=>{this.setState({isModalVisible: false})}}
              >
                <Text style={{color:'#ff5722'}}>Cancel</Text>
              </TouchableOpacity>
            </View>

          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )
}
  render() {
    return (
      <View style={styles.container}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
        {
          this.showModal()
        }
        </View>
 
        <View style={styles.profileContainer}>
          <Image 
            style = {{width: 250, height: 300}}
            source = {require('../assets/logo.png')}
          />
          <Text style={styles.title}>Book Santa App</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
            style={styles.loginBox}
            placeholder="Enter Email ID"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <TextInput
            style={styles.loginBox}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TouchableOpacity
          style={[styles.button,{marginBottom:20, marginTop:20}]}
           onPress={()=>{
            this.userLogin(this.state.emailId,this.state.password)
          }}
          >
            <Text 
            style={styles.buttontext}
            >Login</Text>
          </TouchableOpacity>
          
           <TouchableOpacity
           style={styles.button}
           onPress={()=>{
            this.setState({isModalVisible:true})
          }}
           >
            <Text
           style={styles.buttontext}
            >Sign Up</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:45,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  },
  KeyboardAvoidingView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  modalTitle :{
    justifyContent:'center',
    alignSelf:'center',
    fontSize:30,
    color:'#ff5722',
    margin:50
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },
})