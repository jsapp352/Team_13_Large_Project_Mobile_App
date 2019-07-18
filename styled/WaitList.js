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
  View
} from "native-base";


export default class WaitList extends Component {
  

	constructor(props)
	{
		super(props);
	
		this.state= {
			current_course: '',
			current_list: props.list,
			course_list: [],
			course_ids: [],
			current_status: ['h','h','h','w','w','w','w','w'],
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
			num_tas: 3,
			avg_wait: 5,
			showTimePicker: false,
			ta_time_in: null,
			ta_time_out: null,
			in_selected: true,
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
	}

	toggleModal()
	{
		this.setState({modalView:!this.state.modalView});
	}

	helpStudent()
	{
		let list = this.state.current_list.filter( (name,index) => index !== this.state.selectedStudentIndex);
		this.setState({current_list:list})
		this.toggleModal();
	}

	markAbsent()
	{
		let list = this.state.current_list.filter( (name,index) => index !== this.state.selectedStudentIndex);
		this.setState({current_list:list})
		this.toggleModal();
	}
	
	postponeStudent()
	{
		let newSpot = this.state.current_list[this.state.selectedStudentIndex]
		let list = this.state.current_list.filter( (name,index) => index !== this.state.selectedStudentIndex);
		list.push(newSpot)
		this.setState({current_list:list})
		this.toggleModal();
	}
	
	clearList()
	{

	}

	componentWillMount(props)
	{
		console.log(this.props);
		let url = 'https://protected-shelf-85013.herokuapp.com/session/inProgress/' + this.props.courseId + '/';
		fetch(url).then(response => response.json()).then(data => {console.log(data)});
	}

	// Fetch for TA authorization
	validateTa()
	{
		this.setState({validTA:true});
	}

	selectStudent(student, i)
	{
		this.setState({selectedStudent:student, selectedStudentIndex:i});
		this.toggleModal();
	}

	goBack()
	{
		this.setState({canceled:true});
	}

	getTime(i)
	{
		let hours = new Date().getHours() ;
		let mins = new Date().getMinutes();

		mins += Math.round(i * this.state.avg_wait / this.state.num_tas);       
		if(mins > 59)
		{
			mins -= 60;
			hours++;
		}       

		if(hours > 12)
		{
			hours -= 12;
		}
		
		let am_pm = ' PM';
		let zero = '';

		if(mins < 10)
			zero = '0';

		if(hours > 12)
			am_pm = ' AM';

		return(hours + ":" + zero + mins + am_pm);
	
	}

	componentWillMount() 
	{   
		let course_arr = [];
		let course_ids = [];
		let temp_list = [];

		let url = 'https://protected-shelf-85013.herokuapp.com/course/'
		fetch(url).then(response => response.json()).then(data => {

			console.log(data);
			for(let i = 0; i < data.length; i++)
			{
				if(data[i].active)
				{   
					let course_title = data[i].courseName;
					let title = course_title.slice(0,3);
					let code = course_title.slice(3);
					let alias = [];
					alias.push(course_title.charAt(0));
					for(let j = 1; j < course_title.length - 1; j++)
					{
						if(course_title.charAt(j) === ' ')
						{
							if(course_title.charAt(j+1) === 'I')
							{
								if(j === course_title.length - 2)
									alias.push('1');
								else if(course_title.charAt(j+2) === 'I')
									alias.push('2');
							}
							else    
								alias.push(course_title.charAt(j+1));
						}
					}
					course_ids.push(data[i].courseId);
					course_arr.push(alias.join("").toUpperCase());
				}   
			}

			for(let i = 0; i < course_ids.length; i++)
			{
				let ext = course_ids[i];	
				let nested_url = 'https://protected-shelf-85013.herokuapp.com/session/waiting/'+ ext +'/';
				fetch(nested_url).then(res => res.json()).then(list=>{
				temp_list.push(list);
			})}

			this.setState({course_list:course_arr, course_ids:course_ids});
		});

		console.log(temp_list);
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
		
	handleDatePicked(date)
	{
		let time = date.getHours() + ":" + date.getMinutes();
		if(this.state.in_selected)
		{
			this.setState({ta_time_in:time})
		}
		else
		{
			this.setState({ta_time_out:time})
		}
		this.hideDateTimePicker();
   };

	render(props) 
	{
	
		// Default Student View with no functionality
		if(this.props.view ==='student')
		{

			return(
				<Container>
				<List renderSectionHeader={()=>(<ListItem><Text>Name:</Text></ListItem>)}>
					{this.state.current_list.map((data, i) => (
						<ListItem key={i}>
							<Left>
								<Text>{data}</Text>
							</Left>
							<Body>
								<Text>Help Time: {this.getTime(i)}</Text>
							</Body>
					</ListItem>
					))}
				 </List>
				</Container>
			)

		}

		// Return to Home Page if canceled
		else if(this.state.canceled)
		{
			return <TabBar />
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
						{this.state.current_list.map((data, i) => (
						  <ListItem button onPress={()=>this.selectStudent(data, i)}key={i}>
							<Left>
							  <Text>{data}</Text>
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
			
			return(
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.logInTa}
					>
					<Content>
					<Form>
						<Item floatingLabel>
						  <Label>Enter TA Pin</Label>
						  <Input maxLength={5}/>
						</Item>
						<Item floatingLabel>
						  <Label>Enter Your Name</Label>
						  <Input/>
						</Item>
						<View style={{marginTop: 15, flex:1, flexDirection:'column', justifyContent:'center'}}>
							<Item>
							<Label>{this.state.ta_time_in}</Label>
							<Button small style={{ margin: 15, marginTop: 10 }} block onPress={this.handleTimeIn}>
								<Text>Time In</Text>
							</Button>
							</Item>
							<Button small style={{ margin: 15, marginTop: 10 }} block onPress={this.handleTimeOut}>
								<Text>Time Out</Text>
							</Button>
						</View>
						<View style={{marginTop: 10, flex:1, flexDirection:'column', justifyContent:'center'}}>
							<Button small style={{ margin: 15, marginTop: 10 }} block onPress={()=>{this.setState({showCourseList:true})}}>
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
					<Button style={{ margin: 15, marginTop: 50 }} block onPress={this.goBack}>
						<Text>Submit</Text>
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
								<Input maxLength={5}/>
							</Item>
						</Form>
						<Button block onPress={this.validateTa} style={{ margin: 15, marginTop: 50 }}>
							<Text>Manage List</Text>
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

