import React, { Component } from 'react';
import { Button, Form, Container, Col } from 'react-bootstrap';
import { Map } from './Map';


export class NewPathForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathName: '',
      shortDescription: '',
      fullDescription: '',
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

  onSubmit = (event) => {
    event.preventDefault();
    this.props.addPathToList(this.state.pathName, this.state.shortDescription, this.state.fullDescription);
    this.setState({
      pathName: '',
      shortDescription: '',
      fullDescription: ''
    }) ;
  };

  render() {  
    const {
      pathName,
      shortDescription,
      fullDescription
    } = this.state;

    return (

      <Container  className="bg-light add-path-container justify-content-start">
        <button type="button" className="close" aria-label="Close" onClick={this.props.toggleForm}>
          <span aria-hidden="true">&times;</span>
        </button>
        <Col xs={6}>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={pathName} onChange={this.onTitleChange}/>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Short description</Form.Label>
            <Form.Control as="textarea" rows="3" maxLength="160" value={shortDescription} onChange={this.onShortDescChange} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Full description</Form.Label>
            <Form.Control as="textarea" rows="4" value={fullDescription} onChange={this.onFullDescChange} />
          </Form.Group>
          <Form.Group>
          <Form.Text>
            Length 
          </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add path
          </Button>
        </Form>
        </Col>
        <Col xs={6}>
          <Map
            googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBz7Oa8C8MOOd20FJSUaYQc0lrlLkvn0m4'}
            loadingElement={<div style={{ height: '400px' }} />}
            containerElement={<div style={{ height: '400px' }} />}
            mapElement={<div style={{ height: '400px' }} />}
          />
        </Col>    
      </Container>
    );
  };
}
