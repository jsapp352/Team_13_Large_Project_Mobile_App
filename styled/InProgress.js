import React, { Component } from "react";
import { StyleSheet, ScrollView, Modal } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import TabBar from './TabBar'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Form,
  List,
  ListItem,
  Label,
  Text,
  Input,
  Item,
  Left,
  Right,
  Body,
  Subtitle,
  CheckBox,
  Spinner,
  View
} from "native-base";


export default class InProgress extends Component
{
	constructor(props)
	{
		super();
		console.log(props);
		this.state = {
			goBack:false,
			inProgress: [],
			loading:true,
			courseId: 31,
			selectedStudent:'',
			selectedStudentIndex: -1,
			selectedSessionId: 0,
			modalView: false,
			taPin: props.pin,
		}

		this.selectStudent = this.selectStudent.bind(this);
		this.endTutor = this.endTutor.bind(this);
	}
		
	toggleModal()
	{
		this.setState({modalView:!this.state.modalView});
	}

	componentWillMount()
	{
		let url = 'https://protected-shelf-85013.herokuapp.com/session/inProgress/'+this.state.courseId + '/'
		let students = [];
		fetch(url).then(response=>response.json()).then(data=>{
			for(let i = 0; i < data.length; i++)
			{
				let timeIn = new Date(data[i].startTime);
				let time = timeIn.getHours() + ':' + timeIn.getMinutes();
				students.push({name:data[i].studentName, time: time, sessionId:data[i].sessionId});
			}

			this.setState({inProgress:students,loading:false})
		})
	}
		
	endTutor()
	{
		this.setState({loading:true});

		let url = 'https://protected-shelf-85013.herokuapp.com/session/kiosk/endTutor/';
		let options = {
			method:'PUT',
			headers: { 	"Content-Type": "application/json; charset=UTF-8" },
			body:JSON.stringify({
				encryptedPin:this.state.taPin,
				sessionId:this.state.selectedSessionId
			})	
		}

		fetch(url, options).then(response=>response.json()).then(data=>{
			this.componentWillMount();
			this.toggleModal();
		})
	}

	selectStudent(student, i)
	{
		console.log(i);
		console.log(student);
		this.setState({selectedStudent:student.name, selectedStudentIndex:i, selectedSessionId:student.sessionId});
		this.toggleModal();
	}

	render(props)
	{
		if(this.state.goBack)
		{
			return <TabBar /> 
		}
		if(this.state.loading || this.state.inProgress === undefined)
		{
			return <Spinner color='blue' />
		}
		return (
				<Modal
					animationType="slide"
					transparent={false}
					visible={!this.state.goBack}
				>
				<Container >
					<Header>
						<Left>
							<Button transparent onPress={()=>this.setState({goBack:true})}>
								<Icon name="arrow-back" />
							</Button>
						</Left>
						<Body>
							<Title>TA View</Title>
							<Subtitle>Currently Being Helped:</Subtitle>
						</Body>
						<Right />
					</Header>

				<ScrollView> 
					<Content>
						<List>
						{this.state.inProgress.map((data, i) => (
						  <ListItem button onPress={()=>this.selectStudent(data, i)} key={i}>
							<Left>
							  <Text>{data.name}</Text>
							</Left>
							<Right>
								<Text>{data.time}</Text>
							</Right>
						  </ListItem>
						))}
						</List>
					</Content>
				</ScrollView>
				</Container>
				<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalView}
						>
						<Content>
			
						  <Button block onPress={this.endTutor} style={{ margin: 15, marginTop: 50 }}>
							<Text>Help {this.state.selectedStudent}</Text>
						  </Button>
				
						  <Button block onPress={()=>this.setState({modalView:false})} style={{ margin: 15, marginTop: 15 }}>
							<Text>Cancel</Text>
						  </Button>
						</Content>
					</Modal>	
				</Modal>
		)
	}
}
