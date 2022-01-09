import { parse } from 'commander';
import React from 'react';
import { createPortal } from 'react-dom';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { color, round } from 'react-native-reanimated';

export default class App extends React.Component {
  constructor() {
    super();
    this.state={
      user_sentence:'',
      result:'70%',
      isRedLightVisible:false,
      isYellowLightVisible:false,
      isGreenLightVisible:false,
      isInputAndButtonVisible:true,
      isResultVisible:false
    }
  }
  plagiarism = async() => {
    var data = {user_sentence:this.state.user_sentence}
    let response = await fetch("http://127.0.0.1:5000", {
        method:'POST',
        headers: {
          'Access-Control-Allow-Origin': '*', 
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },  
        body:JSON.stringify(data)
         
      })

      var responseJson = await response.json();
      console.log(responseJson);
      var stringifiedResponse = JSON.stringify(responseJson)
      //var array = JSON.parse(stringifiedResponse)
      //var text1 = array.data.id;
      console.log(stringifiedResponse)
      //this.setState({textHolder:text1})
      console.log(this.state.user_sentence)
      var rounded_stringifiedResponse=Math.round(stringifiedResponse * 10) / 10
      this.setState({result:rounded_stringifiedResponse})
    }
    
    // .then(response.json()).then((responseJson) => {
    //     data = responseJson;
    //     console.log(data)
    // })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view}>
          <Text style={styles.titleText}>Plagiarism App</Text>
        </View>
        {this.state.isInputAndButtonVisible &&
        <TextInput style={styles.input} onChangeText= {(text) => {
        this.setState({ user_sentence: text});
        }}>
        </TextInput>
        }
        {this.state.isInputAndButtonVisible &&
        <TouchableOpacity style={styles.button} 
        onPress={()=> {
          this.plagiarism()
        }}>
          <Text style={styles.buttonText}> Check
          </Text>
        </TouchableOpacity>
        }
        {this.state.isResultVisible &&
        <Text style={{fontSize:100,textAlign:"center",marginTop:200,marginBottom:5,marginLeft:-1500,color: this.state.isRedLightVisible ? "red" : (this.state.isGreenLightVisible ? "#39FF14" : "yellow")}}>{this.state.result}</Text>        
        }
        {this.state.isRedLightVisible &&
          <Image style={styles.image} source={require('./redLight.png')}/>
        }
        {this.state.isYellowLightVisible &&
          <Image style={styles.image} source={require('./yellowLight.png')}/>
        }
        {this.state.isGreenLightVisible &&  
          <Image style={styles.image} source={require('./greenLight.png')}/>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize:100,
    textAlign:"center",
    marginTop:200,
    marginBottom:5,
    marginLeft:-1500,
    color:"red"
  },
  titleText: {
    fontSize:30,
    textAlign:"center",
    color:"#39FF14",
    fontWeight:"bold"
  },
  input: {
    height: 40,
    margin: 8,
    borderWidth: 2,
    borderRadius:10,
    borderColor:"red",
    padding: 10,
    color:"#39FF14",
    fontWeight:"bold",
    marginLeft:-1700,
    marginTop:190,
    backgroundColor:'black'
  },
  button: {
    height: 40,
    borderWidth: 2,
    borderRadius:10,
    borderColor:"red",
    padding: 10,
    marginLeft:-1440,
    marginTop:-48,
    backgroundColor:'black'

  },
  view: {
    borderWidth: 2, 
    borderRadius: 10,
    borderColor: 'red',
    width: 300,
    height:65,
    padding: 5,
    backgroundColor: 'black',
    marginLeft:-1655,
    marginTop:-790,
    marginBottom:-100
  },
  buttonText:{
    textAlign:"center",
    color:"#39FF14",
    marginLeft:-5,
    marginTop:-2,
    fontWeight:"bold"
  },
  image:{
    width:50,
    height:150,
    alignItems:"center",
    marginLeft:-1800,
    marginTop:-135,
    marginBottom:-120,
    borderColor:"grey",
    borderWidth:2,
    borderRadius:10
  }
}); 

//#7AD7F0