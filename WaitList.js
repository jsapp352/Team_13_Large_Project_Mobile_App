import React from 'react'
import {FlatList, Modal, TouchableHighlight, Button, StyleSheet, Text, View} from 'react-native'
import {ListItem} from "react-native"
import App from './App'


export default class WaitList extends React.Component
{
	constructor()
	{
		super();
		this.state={
			numStudents: 0,
			waitTime: 0,
			current_num_ta: 4,
			current_avg_session_time: 7,
			current_course_id: 0,
			list: ['Tim','John','James','Jim','Todd','Johhny'],
			modalVisible: false,
			backPushed: false,
		}
		this.handleClick = this.handleClick.bind(this);
		this.helpStudent = this.helpStudent.bind(this);
	}


	setModal(visible)
	{
		this.setState({modalVisible:visible})
	}

	// Method should be called prior to render()-> componentWillMount
	populateList()
	{
			
	}

	// Will fetch from api and call populateList with proper data
	componentWillMount()
	{

	}
	
	helpStudent()
	{
		// Make fetch request to remove user from list and add to current
		// Update state to show current list
		// remove modal
		this.setModal(false);		
	}

	removeStudent()
	{

	}

	markAbsent()
	{

	}

	handleClick()
	{
		this.setModal(!this.state.modalVisible);
	}
		

	currentList()
	{
		return this.state.list.map((l) => ({key : l, name:l}))
	}
	
	render(props)
	{
		let data = this.currentList();

		if(this.state.backPushed)
		{
				return <App />
		}
		else if(this.props.status === 'student')
		{
			return( 
				<View style={styles.container}>
					<Button title='Fuck Go Back' onPress={() => {this.setState({backPushed:true})}}></Button>
					<Text style={styles.welcome}>Estimated Wait Time: {data.length * this.state.current_avg_session_time / this.state.current_num_ta} mins</Text>
					<Text>Current List:</Text>
					<FlatList
						data={data}
						renderItem={({item}) => <Text style={styles.listStyle}>{item.name}</Text>}
					/>
				</View>
			);
		}
		else if(this.props.status === 'ta')
		{
			return( 
				<View style={styles.container}>
					<Button title='Home' onPress={() => {this.setState({backPushed:true})}}></Button>
					<Text>Select Student From List:</Text>
					<Modal 
						animationType='slide'
						transparent={false}
						visible={this.state.modalVisible}
						>
						<View>
							<Button title='Cancel' onPress={this.handleClick}></Button>
							<Button title='Help Student' onPress={this.helpStudent}></Button>
							<Button title='Destroy Student Emotionally' onPress={this.helpStudent}></Button>
							<Button title='Mark Student Absent' onPress={this.helpStudent}></Button>
							<Button title='Rate Student' onPress={this.helpStudent}></Button>
							
						</View>
					</Modal>
					<FlatList
						data={data}
						renderItem={({item}) => <Button onPress={this.handleClick} style={styles.listStyle} title={item.name}></Button>}
					/>
				</View>
			);
		}
	
	}	
}

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
