import React, { Component } from 'react';
import './App.css';
import { NewPathForm } from './components/NewPathForm';
import { Container, Col, Button, Navbar, Form, Row, Tab } from 'react-bootstrap';
import { PathItem } from './components/PathItem';
import { firestore } from './firebase';
import { collectIdsAndDocs } from './utilites';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      showForm: false,
      query: '',
      id: null,
      elected: false,
    };
  };

  componentDidMount = async () => {
    const snapshot = await firestore.collection('data').get();
    const data = snapshot.docs.map(collectIdsAndDocs);

    this.setState({ data });
  }

  addPathToList = async (title, shortDesc, fullDesc) => {
    const docRef = await firestore.collection('data').add({ title, shortDesc, fullDesc });
    const doc = await docRef.get();
    const newPath = collectIdsAndDocs(doc)
    
    this.setState(({ data }) => {
      return {
        data: [newPath, ...data]
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
        return item.title.includes(query) || item.fullDesc.includes(query);
      });
    }
  };

  onSearchChange = (event) => {
    this.setState({
      query: event.target.value
    });
  };

  selectItem = (event, id) => {
    event.preventDefault();

    this.setState({
      id
    });
  };

  removeItem = async (event, id) => {
    event.preventDefault();

    await firestore.doc(`data/${id}`).delete();
    
    const newData = this.state.data;
    const data = newData.filter(item => item.id !== id);

    this.setState({
      data
    });
  };
  
  moveUp = () => {
    const { data, id } = this.state;
    const removed = data.splice(id, 1);

    this.setState((prevState) => {
      return {
        data: [...removed, ...prevState.data]
      }
    });
  };

  moveDown = () => {
    const { data, id } = this.state;
    const removed = data.splice(id, 1);
    
    this.setState((prevState) => {
      return {
        data: [...prevState.data, ...removed]
      }
    });
  };

  render() {
    const {
      data,
      showForm,
      query
    } = this.state;

    let filteredItems = this.search(data, query);

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
        
        <Tab.Container id="list-group-tabs-example">
          <Container className="main-container">
            <Row>
              <Col xs={6} className="search">
                <Form.Control type="text" placeholder="Search..." className="pr-5" value={query} onChange={this.onSearchChange}/>
              </Col>
            </Row> 
            {filteredItems.map((item) => {
                return (
                  <PathItem
                    key={item.id}
                    selectItem={this.selectItem}
                    removeItem={this.removeItem}
                    moveUp={this.moveUp}
                    moveDown={this.moveDown}
                    id={item.id}
                    title={item.title}
                    shortDesc={item.shortDesc}
                    fullDesc={item.fullDesc}
                  />
                )      
              })}
          </Container>
        </Tab.Container>      
      </Container>        
    );
  };
}

export default App;
