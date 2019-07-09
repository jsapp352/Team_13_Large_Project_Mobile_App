/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,Picker, ImageBackground, StyleSheet, Text, TextInput, View, Button} from 'react-native';
import WaitList from './WaitList'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
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
			class_list: ['COP3502','COP3503','COP3330','COP3223','CDA3103', "CLASS 5"],			
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
					<Text style={styles.welcome}>Welcome to the Cave</Text>
					<Text style={styles.welcome}>Please Check in</Text>
					<TextInput onChangeText={this.handleChange} maxLength={8} placeholder="Enter NID"></TextInput>
					<Text>Select Class</Text>
					<Picker selectedValue={this.state.pickerValue} onValueChange={(value)=>{this.setState({pickerValue:value})}} style={{height: 50, width: 150}}>
						{this.state.class_list.map(function(d, id){
							return (<Picker.Item key={d} label={d}/>)
						})}
					</Picker>
					<Button onPress={this.handleClick} title='Check in'></Button>
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
const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
}

// <Picker.Item label="COP3502" value="cs1" />
// 						<Picker.Item label="COP3503" value="cs2" />
// 						<Picker.Item label="COP3330" value="oop" />
// 						<Picker.Item label="CDA3103" value="comporg" />
// 						<Picker.Item label="COP3223" value="intro" />
