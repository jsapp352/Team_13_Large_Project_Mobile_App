import React, { Component } from "react";
import { StyleSheet, ScrollView, Modal } from 'react-native';
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
	Subtitle
} from "native-base";


export default class WaitList extends Component {
  

	constructor(props)
	{
		super(props);
	
		this.state= {
			current_course: '',
			current_list: props.list,
			current_status: ['h','h','h','w','w','w','w','w'],
			modalView: false,
			selectedStudent: '',
			validTA: false,
			canceled: false,
			num_tas: 3,
			avg_wait: 5,
		}
		this.toggleModal = this.toggleModal.bind(this);
		this.selectStudent = this.selectStudent.bind(this);
		this.goBack = this.goBack.bind(this);
		this.validateTa = this.validateTa.bind(this);
		this.getTime = this.getTime.bind(this);
	}

	toggleModal()
	{
		this.setState({modalView:!this.state.modalView});
	}

	helpStudent()
	{

	}

	markAbsent()
	{

	}
	
	postponeStudent()
	{

	}
	
	clearList()
	{

	}

	// Fetch for TA authorization
	validateTa()
	{
		this.setState({validTA:true});
	}

	selectStudent(student)
	{
		this.setState({selectedStudent:student});
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
		
		if(hours > 12)
			am_pm = ' AM'

		return(hours + ":" + mins + am_pm)
	
	}

	componentDidMount() 
	{	
  }
	
	render(props) {
		if(this.props.view ==='student')
		{
			return(
				<Container>
          <List>
            {this.state.current_list.map((data, i) => (
              <ListItem key={i}>
                <Left>
                  <Text>{data}</Text>
                </Left>
								<Body>
									<Text>Help Time:  {this.getTime(i)}</Text>
								</Body>
              </ListItem>
            ))}
          </List>
				</Container>
				)
		}
		else if(this.state.canceled)
		{
			return <TabBar />
		}
		
		if(this.state.validTA)
		{
	    return (
				<Modal
					animationType="slide"
		      transparent={false}
		      visible={true}
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
	              <ListItem button onPress={()=>this.selectStudent(data)}key={i}>
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
		          <Button block onPress={this.toggleModal} style={{ margin: 15, marginTop: 50 }}>
		            <Text>Help {this.state.selectedStudent}</Text>
		          </Button>
						  <Button block onPress={this.toggleModal} style={{ margin: 15, marginTop: 15 }}>
		            <Text>Mark {this.state.selectedStudent} Absent</Text>
		          </Button>
							<Button block onPress={this.toggleModal} style={{ margin: 15, marginTop: 15 }}>
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
				            <Text>Sign In</Text>
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

