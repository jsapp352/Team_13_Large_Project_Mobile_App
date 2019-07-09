/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,Picker, StyleSheet, Text,TouchableOpacity,
		TextInput, View, Button} from 'react-native';
import Student from './Student'
import TAPortal from './TAPortal'
import Styling from './Styling.js'


//This is placeholder for cross platform debugging in the future

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


// state holds the status of the user. Default is student
// State is set depending on user selections. Proper authentication
// is required for each user type.  User member determines if a user is 
// logged in. Once a selection is made, new component is rendered depending
// on choice
export default class App extends Component {		

	constructor()
	{
		super();
		this.state = {
			user: false,
			student: true,
			ta: false,		
		}
	}
	
	studentLogin = () => 
	{
		this.setState({user:true, student:true,})			
	}
	
	taLogin = () => 
	{
		this.setState({user:true, student:false, ta:true});
	}

	// Picker PlaceHolder should be replaced with API fetch
	render() {
		if(this.state.user === false)
		{
			return(
				<View style={style.header}>
					<Text style={style.header}>Select Status:</Text>
					<TouchableOpacity onPress={this.studentLogin}><Text style={styles.button}>Student</Text></TouchableOpacity>
					<TouchableOpacity onPress={this.taLogin}><Text style={styles.button}>Assistant</Text></TouchableOpacity>
				</View>
			);
		}
		else
		{
			if(this.state.student)
			{
				return(<Student />)
			}
			else if(this.state.ta)
			{
				return (<TAPortal />)
			}
			else
			{
				alert('woops')
			}
		}
	}
}

const style = {
	circle: {
    marginTop: 0,
    marginRight: 40,
    marginBottom: 10,
    marginLeft: 40,
    minWidth: 90,
    minHeight: 90,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    fontSize: 12,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    // verticalAlign: 'center',
    lineHeight: 90
  },
  header: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0
  },
  topBar: {
    backgroundColor: '#000',
    height: 60
  },
  title: {
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 8,
    fontSize: 20,
    marginLeft: 20,
    // verticalAlign: 'middle',
    lineHeight: 60,
    // float: 'left'
  },
  // information: {
  //   backgroundColor: '#e0b400',
  //   // backgroundImage: 'url(../img/bg-ucf.png)',
  //   backgroundPosition: 'top',
  //   height: 230
  // },
  circleContainer: {
    height: 'inherit',
    alignItems: 'center',
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center'
  },
  caption: {
    paddingTop: 30,
    color: '#fff',
    fontWeight: '500'
  },
  'menu-item': {
    textAlign: 'center',
    marginTop: 20,
    marginRight: 0,
    marginBottom: 20,
    marginLeft: 0,
    color: '#000'
  },
  'menu-icon': {
    fontSize: 12
  },
  line: {
    height: 1,
    width: '50%',
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    backgroundColor: '#eaeaea'
  },
  'sub-title': {
    color: '#000',
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 20
  },
  'course-card': {
    width: 250,
    marginRight: '5%'
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
	button: {
	    backgroundColor: 'gray',
   		borderColor: 'white',
	    borderWidth: 1,
	    borderRadius: 12,
	    color: 'white',
	    fontSize: 24,
	    fontWeight: 'bold',
	    overflow: 'hidden',
	    padding: 12,
		textAlign:'center',
	}
}


// <Picker.Item label="COP3502" value="cs1" />
// 						<Picker.Item label="COP3503" value="cs2" />
// 						<Picker.Item label="COP3330" value="oop" />
// 						<Picker.Item label="CDA3103" value="comporg" />
// 						<Picker.Item label="COP3223" value="intro" />
