import React, { Component } from "react";
import { StyleSheet, ScrollView, Modal } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import TabBar from './TabBar.js'
import InProgress from './InProgress.js'
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


export default class WaitList extends Component {
  

	constructor(props)
	{
		super(props);
		this.state = {
			current_course: -1,
			current_list: [],
			course_list: [],
			course_ids: [],
			course_waitlists:[],
			modalView: false,
			selectedStudent: '',
			selectedStudentIndex: -1,
			validTA: false,
			canceled: false,
			wrongPin: false,
			logInTa: false,
			showCourseList: false,
			current_ta_courses: ['CS1','CS2','OOP'],
			current_ta_courses_checked: [false,false,false],
			selectedCourses: [],
			num_tas: 1,
			avg_wait: 5,
			showTimePicker: false,
			ta_time_in: null,
			ta_time_out: null,
			in_selected: true,
			loading: true,
			taPin: '',
			taName: '',
			error:'',
			valid_Ta_for_signin: false,
			goToInProgress: false,
		}
		this.toggleModal = this.toggleModal.bind(this);
		this.selectStudent = this.selectStudent.bind(this);
		this.goBack = this.goBack.bind(this);
		this.validateTa = this.validateTa.bind(this);
		this.getTime = this.getTime.bind(this);
		this.showDateTimePicker = this.showDateTimePicker.bind(this);
		this.hideDateTimePicker = this.hideDateTimePicker.bind(this);
		this.handleDatePicked = this.handleDatePicked.bind(this);
		this.helpStudent = this.helpStudent.bind(this);
		this.postponeStudent = this.postponeStudent.bind(this);
		this.markAbsent = this.markAbsent.bind(this);
		this.handleTimeIn = this.handleTimeIn.bind(this);
		this.handleTimeOut = this.handleTimeOut.bind(this);
		this.getTA = this.getTA.bind(this)
	}

	toggleModal()
	{
		this.setState({modalView:!this.state.modalView});
	}

	helpStudent()
	{
		const encryptedPin = encodeURIComponent(this.encryptPin());
		let url = 'https://protected-shelf-85013.herokuapp.com/session/kiosk/startTutor/'
		let options = {
			method:'PUT',
			headers: { 	"Content-Type": "application/json; charset=UTF-8" },
			body:JSON.stringify({
				encryptedPin:encryptedPin,
				sessionId:this.state.selectedSessionId
			})	
		}

		fetch(url, options).then(response=>response.json()).then(data=>{
			this.setState({canceled:true})
		}) 

		this.toggleModal();
	}

	markAbsent()
	{
		const encryptedPin = encodeURIComponent(this.encryptPin());
		let url = 'https://protected-shelf-85013.herokuapp.com/session/kiosk/cancelTutor/'
		let options = {
			method:'PUT',
			headers: { 	"Content-Type": "application/json; charset=UTF-8" },
			body:JSON.stringify({
				encryptedPin:encryptedPin,
				sessionId:this.state.selectedSessionId
			})	
		}
	
		fetch(url, options).then(response=>response.json()).then(data=>{
			this.setState({canceled:true})
		})
		
		this.toggleModal();
	}
	
	postponeStudent()
	{
		this.markAbsent();
		let url = 'https://protected-shelf-85013.herokuapp.com/session/kiosk/'
		let options = {
			method:'POST',
			headers: { 	"Content-Type": "application/json; charset=UTF-8" },
			body:JSON.stringify({
				courseId:this.state.current_course,
				studentName:this.state.selectedStudent
			})	
		}
		fetch(url, options).then(response=>response.json()).then(data=>{
			this.toggleModal();
		})
	}
	
	encryptPin()
    {
        var CryptoJS = require("crypto-js");

        // This secret key phrase must match the one on the API server.
        // Should be replaced with environment variable.
        const keyString = "hurricanstrictor";

        // Convert the key string to a data array type
        var key = CryptoJS.enc.Utf8.parse(keyString);

        // Encrypt the PIN
        var encryptedPinBytes = CryptoJS.AES.encrypt(this.state.taPin, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        // Convert the encrypted PIN data array to a hex string
        var encryptedPinHexString = encryptedPinBytes.ciphertext.toString();
	
        return encryptedPinHexString;
    }

	// Fetch for TA authorization
	// 206131 -> PIN
	validateTa(inProgessBoolean)
	{
		console.log(inProgessBoolean)
		const encryptedPin = encodeURIComponent(this.encryptPin());
		const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=UTF-8" },
			body: JSON.stringify({encryptedPin:encryptedPin})
        };
    	fetch('https://protected-shelf-85013.herokuapp.com/user/kiosk/pin/', options)
            .then(response => response.json())
            .then(data => {
				if(data.status === 500)
				{
					this.setState({validTA:false, error:'INVALID PIN'})
				}
				else
				{
					if(inProgessBoolean)
					{
						this.setState({goToInProgress:true})
					}
					else
					{
                		this.setState({taName: data.name});
						this.setState({validTA:true});
					}
				}
            }).catch(err=>{this.setState({error:'INVALID PIN'})})
	}

	selectStudent(student, i)
	{
		console.log(student);
		this.setState({selectedStudent:student.studentName, selectedStudentIndex:i, selectedSessionId:student.sessionId, current_course:student.courseId});
		this.toggleModal();
	}

	goBack()
	{
		this.setState({canceled:true});
	}

	getTime(avg_wait, i)
	{
		let hours = new Date().getHours() ;
		let mins = new Date().getMinutes();
		
		if(avg_wait < 0)
			avg_wait = 5;
		
		if(avg_wait > 30)
			avg_wait = 30;

		mins += Math.round(i * avg_wait / this.state.num_tas);       
		while(mins > 59)
		{
			mins -= 60;
			hours++;
		} 
      
		let am_pm = ' PM';
		if(hours <= 11)
			am_pm = ' AM';

		if(hours > 12)
		{
			hours -= 12;
		}
		
		let zero = '';

		if(mins < 10)
			zero = '0';

		return(hours + ":" + zero + mins + am_pm);
	}

	handleTimeIn()
	{
		this.setState({in_selected:true});
		this.showDateTimePicker();
	}
		
	handleTimeOut()
	{
		this.setState({in_selected:false});
		this.showDateTimePicker();
	}

	showDateTimePicker () 
	{
		this.setState({ showTimePicker: true });
	}

	hideDateTimePicker()
	{
		this.setState({ showTimePicker: false });
	}

	toggleCheck(i)
	{
		let x = this.state.current_ta_courses_checked;
		x[i] = !x[i];
		this.setState({current_ta_courses_checked:x})
	}
	

	// Needs USERID to be working. This should get the course list for a given TA and update
	// state for selection. 
	getTA()
	{
		const encryptedPin = encodeURIComponent(this.encryptPin());
		const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json; charset=UTF-8" },
			body: JSON.stringify({encryptedPin:encryptedPin})
        };
    	fetch('https://protected-shelf-85013.herokuapp.com/user/kiosk/pin/', options)
            .then(response => response.json())
            .then(data => {
				console.log(data);
				if(data.status === 500)
				{
					this.setState({validTA:false, error:'INVALID PIN'})
				}
				else
				{
					let courseUrl = 'https://protected-shelf-85013.herokuapp.com/course/ta/'
					const courseOptions = {
			            method: 'GET',
			            headers: { 
							"Content-Type": "application/json; charset=UTF-8",
							"Authorization": '',		
						 },
			        };

					fetch(courseUrl, courseOptions).then(res=>res.json()).then(courseList=>{
						let taList = [];
						let taListChecks = [];
						console.log('CourseList = ' + courseList)
						for(let i = 0; i < courseList.length; i++)
						{
							if(courseList[i].active)
							{
								taList.push(courseList[i].courseName);
								taListChecks.push(false);
							}
						}

						this.setState({current_ta_courses:taList, current_ta_courses_checked:taListChecks})
					}).catch(e=>{console.log(e)})
					// fetch()


                	this.setState({taName: data.name});
					this.setState({valid_Ta_for_signin:true});
				}
            }).catch(err=>{this.setState({error:'INVALID PIN'})})
	}
	
	handleDatePicked(date)
	{
		let time = '';

		if(date.getHours() === 0)
			time = '12';
		else
			time = date.getHours() + '';
			
		if(date.getMinutes() < 10)
			time = time + ":0" + date.getMinutes();
		else
			time = time + ':' + date.getMinutes();

		if(this.state.in_selected)
		{
			this.setState({ta_time_in:time})
		}
		else
		{
			this.setState({ta_time_out:time})
		}
		this.hideDateTimePicker();
	}
	
	render(props) 
	{
		let course = this.props.course;
		let index = this.props.selection;
		if(course === undefined || course[this.props.selection] === undefined || course[this.props.selection].waitlist === undefined)
		{
			return <Spinner color="blue" />;
		}
		let avg_wait = course[index].avg_wait / 60;
		console.log(course[index])
		// Default Student View with no functionality
		if(this.props.view ==='student')
		{

			return(
				<Container>
					<List renderSectionHeader={()=>(<ListItem><Text>Name:</Text></ListItem>)}>
					{course[this.props.selection].waitlist.map((data, i) => (
						<ListItem key={i}>
							<Left>
								<Text>{data.studentName}</Text>
							</Left>
							<Right style={{justifyContent:'flex-end'}}>
								<Text>{this.getTime(avg_wait, i)}</Text>
							</Right>
					</ListItem>
					))}
				 </List>
				</Container>
			)

		}
		else if(this.state.goToInProgress)
		{
			const pin = encodeURIComponent(this.encryptPin());
			return <InProgress pin={pin} />
		}
		// Return to Home Page if canceled
		else if(this.state.canceled)
		{
			return <TabBar index={index}/>
		}   

		// Shows the TA Portal upon successful TA Login
		else if(this.state.validTA)
		{

		return (
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.validTA}
				>
				<ScrollView> 
				<Container style={styles.container}>
					<Header>
						<Left>
							<Button transparent onPress={this.goBack}>
								<Icon name="arrow-back" />
							</Button>
						</Left>
						<Body>
							<Title>TA View</Title>
							<Subtitle>Currently Waiting:</Subtitle>
						</Body>
						<Right />
					</Header>

					<Content>
						<List>
						{course[this.props.selection].waitlist.map((data, i) => (
						  <ListItem button onPress={()=>this.selectStudent(data, i)} key={i}>
							<Left>
							  <Text>{data.studentName}</Text>
							</Left>
							<Right>
							  <Icon name="arrow-forward" />
							</Right>
						  </ListItem>
						))}
						</List>
					</Content>
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalView}
						>
						<Content>
						  <Button block onPress={this.helpStudent} style={{ margin: 15, marginTop: 50 }}>
							<Text>Help {this.state.selectedStudent}</Text>
						  </Button>
						  <Button block onPress={this.markAbsent} style={{ margin: 15, marginTop: 15 }}>
							<Text>Mark {this.state.selectedStudent} Absent</Text>
						  </Button>
						  <Button block onPress={this.postponeStudent} style={{ margin: 15, marginTop: 15 }}>
							<Text>Reschedule {this.state.selectedStudent}</Text>
						  </Button>
						  <Button block onPress={this.toggleModal} style={{ margin: 15, marginTop: 15 }}>
							<Text>Cancel</Text>
						  </Button>
						</Content>
					</Modal>
				</Container>
				</ScrollView>
				</Modal>
			);
		}

		// Shows TA Login Page when Sign in for Office hours is selected
		else if(this.state.logInTa)
		{
			if(!this.state.valid_Ta_for_signin)
			{
				return(
					<Modal
					animationType="slide"
					transparent={false}
					visible={!this.state.valid_Ta_for_signin}
					>
					<Content>
					<Form>
						<Item floatingLabel>
						  <Label>Enter TA Pin</Label>
						  <Input onChangeText={(event)=> this.setState({taPin:event})} maxLength={6}/>
						</Item>
						<Text>{this.state.error}</Text>
						<View style={{marginTop: 15, flex:1, flexDirection:'column', justifyContent:'center'}}>
							<Button block style={{ margin: 15, marginTop: 10 }}  onPress={this.getTA}>
								<Text>Submit</Text>
							</Button>
							<Button block style={{ margin: 15, marginTop: 10 }}  onPress={()=>{this.setState({logInTa:false})}}>
								<Text>Cancel</Text>
							</Button>
						</View>	
					</Form>
					</Content>
					</Modal>
				)
			}
			
			return(
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.logInTa}
					>
					<Content>
					<Form>
						<View style={{marginTop: 15, flex:1, flexDirection:'column', justifyContent:'center'}}>
							<Button block style={{ margin: 15, marginTop: 10 }}  onPress={this.handleTimeIn}>
								<Text>Time In: {this.state.ta_time_in}</Text>
							</Button>							
							<Button block style={{ margin: 15, marginTop: 10 }} block onPress={this.handleTimeOut}>
								<Text>Time Out: {this.state.ta_time_out}</Text>
							</Button>
						</View>
						<View style={{marginTop: 10, flex:1, flexDirection:'column', justifyContent:'center'}}>
							<Button block style={{ margin: 15, marginTop: 10 }} block onPress={()=>{this.setState({showCourseList:true})}}>
								<Text>Select Courses</Text>
							</Button>
						</View>
					</Form>
							
					<DateTimePicker
						mode='time'
						is24Hour={false}
						timePickerModeAndroid='clock'
					  isVisible={this.state.showTimePicker}
					  onConfirm={this.handleDatePicked}
					  onCancel={this.hideDateTimePicker}
					/>  
					<Button style={{ margin: 15, marginTop: 50 }} block disabled={this.state.ta_time_in === null || this.state.ta_time_out === null} onPress={this.goBack}>
						<Text>Submit</Text>
					</Button>
					<Button style={{ margin: 15, marginTop: 50 }} block onPress={this.goBack}>
						<Text>Cancel</Text>
					</Button>
					</Content>
					<Modal 
						transparent={false}
						animationType='slide'
						visible={this.state.showCourseList}
						>
						<Content>
						<Header>
							<Left>
								<Button transparent onPress={()=>{this.setState({showCourseList:false})}}>
									<Icon name="arrow-back" />
								</Button>
							</Left>
							<Body>
								<Title>Select Courses</Title>
							</Body>
							<Right />
						</Header>

						<Content>
						  {this.state.current_ta_courses.map((data, i)=> (
								<ListItem button key={i} onPress={() => this.toggleCheck(i)}>
									<CheckBox
										color="green"
										checked={this.state.current_ta_courses_checked[i]}
										onPress={() => this.toggleCheck(i)}
									/>
										<Body>
										  <Text>{this.state.current_ta_courses[i]}</Text>
										</Body>
								</ListItem>
									))}
						</Content>                                      
	
						<Button style={{ margin: 15, marginTop: 50 }} block onPress={()=>{this.setState({showCourseList:false})}}>
						<Text>Submit</Text>
					</Button>
					</Content>
					</Modal>
		</Modal>
			)

		}

		// Displays the TA Sign in 
		else
		{
			return(
					<Modal
						animationType="slide"
						transparent={false}
						visible={!this.state.validTA}
						>
						<Content>
						  <Form>
							<Item floatingLabel>
								<Label>Enter TA Pin</Label>
								<Input onChangeText={(text)=>{this.setState({taPin:text})}}	maxLength={6}/>
							</Item>
						<Text>{this.state.error}</Text>
						</Form>

						<Button block onPress={()=>this.validateTa(false)} style={{ margin: 15, marginTop: 50 }}>
							<Text>Manage Waitlist</Text>
						</Button>

						<Button block onPress={() => {this.validateTa(true)}} style={{ margin: 15, marginTop: 15 }}>
							<Text>Manage Active Sessions</Text>
						</Button>

						<Button block onPress={() => {this.setState({logInTa:true})}} style={{ margin: 15, marginTop: 15 }}>
							<Text>Sign In to Office Hours</Text>
						</Button>
			
						<Button block onPress={this.goBack} style={{ margin: 15, marginTop: 15 }}>
							<Text>Cancel</Text>
						</Button>

						</Content>
					</Modal>
			);
		}
	}
}

const styles = StyleSheet.create({
  container: {
	backgroundColor: "#FFF"
  },
});





