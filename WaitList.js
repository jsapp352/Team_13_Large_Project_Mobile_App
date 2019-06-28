import React from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import {ListItem} from "react-native"


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
		}
	}


	// method to populate list. Fetch Request should happen here
	// Method should be called prior to render()-> componentWillMount
	populateList()
	{
			
	}

	// Will fetch from api and call populateList.
	componentWillMount()
	{

	}

	currentList = () =>
	{
		return this.state.list.map((l) => ({key : l, name:l}))
	}
	
	render()
	{
		let data = this.currentList();
		console.log(data);
		return( 
			<View style={styles.container}>
				<Text style={styles.welcome}>Estimated Wait Time: {data.length * this.state.current_avg_session_time / this.state.current_num_ta} mins</Text>
				<Text>Current List:</Text>
				<FlatList
					data={data}
					renderItem={({item}) => <Text style={styles.listStyle}>{item.name}</Text>}
				/>
			</View>
		);
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
