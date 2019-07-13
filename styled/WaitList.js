import React, { Component } from "react";
import { StyleSheet, Modal } from 'react-native'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Body,
	Subtitle
} from "native-base";


export default class WaitList extends Component {
  

	constructor()
	{
		super();

		this.state= {
			current_course: '',
			current_list: ['Kim','Tim','Mike','Ivan','Andy','Tony','Shad','Justin','Don','Megan','Jones',],
			current_status: ['h','h','h','w','w','w','w','w'],
			modalView: false,
			selectedStudent: '',
			validTA: false,
		}
		this.toggleModal = this.toggleModal.bind(this);
		this.selectStudent = this.selectStudent.bind(this);
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
		
	}

	selectStudent(student)
	{
		this.setState({selectedStudent:student});
		this.toggleModal();
	}
	
	render(props) {
		console.log(this.props);
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
              </ListItem>
            ))}
          </List>
				</Container>
				)
		}
		
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
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
		            <Text>Cancel</Text>
		          </Button>
							<Button block onPress={this.toggleModal} style={{ margin: 15, marginTop: 15 }}>
		            <Text>Cancel</Text>
		          </Button>
							<Button block onPress={this.toggleModal} style={{ margin: 15, marginTop: 15 }}>
		            <Text>Cancel</Text>
		          </Button>
							<Button block onPress={this.toggleModal} style={{ margin: 15, marginTop: 15 }}>
		            <Text>Cancel</Text>
		          </Button>
		        </Content>
					</Modal>
      </Container>
    );
	}


}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
});

