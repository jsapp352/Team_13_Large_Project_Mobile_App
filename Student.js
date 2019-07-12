/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,Picker, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';
import WaitList from './WaitList'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import style from './style.js'
import Dimensions from 'Dimensions';
//This is placeholder for cross platform debugging in the future

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });



// Class list member will need to be updated to array of strings, depending on backend
export default class App extends Component {		

	constructor()
	{
		super();
		this.state = {
			loggedIn: false,
			current_nid: 0,
			class_list: ['COP3502','COP3503','COP3330','COP3223','CDA3103'],	
			pickerValue: '',		
		}
	}
	
	// Will Take user to waitlist page
	// Authenication and login takes place here
	handleClick = () =>
	{
		this.setState({loggedIn:true});
		// debugger;
	}

	handleChange = (text) => 
	{
		this.setState({
			current_nid: text,
		})	
	}

	// will need to fetch the current waitlist and estimate time 
	// Will Also ned to populate courses for users to select from
	// classes will be added to the class_list state member
	componentWillMount()
	{

	}

	// Picker PlaceHolder should be replaced with API fetch
	render() {
		if(this.state.loggedIn === false)
		{
			return (
				<View style={styles.container}>
				<ImageBackground source={require('./img_cave.jpg')} style={{flex:1, width:'100%', height:'100%'}}>
				<View style={styles.overlay}>
					<Text style={styles.welcome}>Welcome to the Cave</Text>
					<Text style={styles.welcome}>Please Check in</Text>
					<TextInput style={styles.instructions} onChangeText={this.handleChange} maxLength={8} placeholder="Enter NID"></TextInput>
					<Text style={styles.instructions}>Select Class</Text>
					<Picker placeholder='Select Class' selectedValue={this.state.pickerValue} onValueChange={(itemValue, itemIndex)=>{console.log('val: '  + itemValue); this.setState({pickerValue:itemValue})}} style={{height: 50, width: 200}}>
						{this.state.class_list.map(function(d, id){
							return (<Picker.Item style={{textAlign:'center', alignItems:'center'}} key={d} value={d} label={d}/>)
						})}
					</Picker>
					<TouchableOpacity onPress={this.handleClick}><Text style={styles.button}>Check in</Text></TouchableOpacity>
				</View>
				</ImageBackground>
				</View>
			);
		}
		else
		{
			// return (<Text>{this.state.current_nid}</Text>)
			return(<WaitList status='student' />)
		}
	}
}

// Needs Styling
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		justifyContent: 'center',
		margin: 30,
		marginBottom: 20,
		color: 'black',
	},
	instructions: {
		textAlign: 'center',
		color: 'black',
		marginBottom: 5,
		// backgroundColor:'white',
		borderBottomColor: 'black'
	},
	button: {
		backgroundColor: 'rgba(32, 32, 32, 0.3)',
   		borderColor: 'rgba(12, 12, 12, 0.2)',
	    borderWidth: 1,
	    borderRadius: 11,
	    color: 'black',
	    fontSize: 24,
	    fontWeight: 'bold',
	    overflow: 'hidden',
	    padding: 7,
		textAlign:'center',
		alignContent: 'center',
		bottom: 10,
		marginTop:10,
		marginBottom:10,
		marginLeft: 50,
		marginRight: 50,
	},
	overlay:{
		marginTop: 150,
		marginBottom:50,
		marginRight:50,
		marginLeft:50,
		justifyContent:'center',
		borderRadius: 20,
		textAlign:'center',
		backgroundColor:'rgba(255, 255, 255, .7)',
	}
});
