import React, { Component } from 'react';
import { Button, Form, Container, Col } from 'react-bootstrap';

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
            <Form.Control as="textarea" rows="3" value={shortDescription} onChange={this.onShortDescChange} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Full description</Form.Label>
            <Form.Control as="textarea" rows="3" value={fullDescription} onChange={this.onFullDescChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add path
          </Button>
        </Form>
        </Col>
      </Container>
    );
  };
}