import React, { Component } from 'react';
import './App.css';
import { NewPathForm } from './components/NewPathForm';
import { Container, ListGroup, ListGroupItem, Col, Button, Navbar, Form, Row } from 'react-bootstrap';
import { PathDetails } from './components/PathDetails';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      showForm: false,
      query: '',
      selectedItem: null
    };

  };

  onTitleChange = (event) => {
    this.setState({
      pathName: event.target.value
    });
  };

  onShortDescChange = (event) => {
    this.setState({
      shortDescription: event.target.value
    });
  };
  
  onFullDescChange = (event) => {
    this.setState({
      fullDescription: event.target.value
    });
  };
 

  addPathToList = (title, short, full) => {  
     this.setState(({ data }) => {
      const newData = [
        ...data,
        {
          title: title,
          short: short,
          full: full
        }
      ];

      return {
        data: newData
      }
    })
    
    this.toggleForm();
  };

  toggleForm = () => {
    this.setState((prevState) => {
      return {
        showForm: !prevState.showForm
      };
    });
  };

  search = (items, query) => {
    if (query.length === 0) {
      return items;
    } else {
      return items.filter(item => {
        return item.title.includes(query) || item.full.includes(query);
      });
    }
  };

  onSearchChange = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  openDetails = (event) => {
    const idx = this.state.data.findIndex(item => item === event.target.value);
    console.log(idx)
  }

  render() {
    const {
      data,
      showForm,
      query
    } = this.state;

    const filteredItems = this.search(data, query)

    return (
      <Container>
        <Navbar className="d-flex justify-content-between header">
          <Navbar.Brand href="#home">Saunter</Navbar.Brand>
          <Button onClick={this.toggleForm} disabled={showForm ? true : false}>Add path</Button>
        </Navbar>
        {showForm 
          ? <NewPathForm
              addPathToList={this.addPathToList}
              toggleForm={this.toggleForm}
            />
          : null
        }
        <Col xs={6}>
          <Form.Control type="text" placeholder="Search..." value={query} onChange={this.onSearchChange}/>
        </Col>
        
        <ListGroup>
        {filteredItems.map(item => {
            return (
              <Col xs={6} key={item.title} >
                <ListGroupItem className="list-item" >
                  <p className="title">{item.title}</p>
                  <p>{item.short}</p>
                </ListGroupItem>
              </Col>
            )      
          })}
        </ListGroup>
      </Container>
    );
  };
}

export default App;
