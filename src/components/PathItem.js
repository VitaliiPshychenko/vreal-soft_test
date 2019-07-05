import React, { Component } from 'react';
import { ListGroup, Col, Tab, Row } from 'react-bootstrap';

export class PathItem extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      elected: false
    }
  }

  changeElected = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return {
        elected: !prevState.elected
      }      
    });
  };

  render() {
    const {
      title,
      shortDesc,
      fullDesc,
      index,
      selectItem,
      removeItem,
    } = this.props

    const { elected } = this.state;
    const electedClass = elected
      ? 'position-relative elected'
      : 'position-relative';

    return (
      <>
        <Row>
          <Col xs={6} onClick={this.clicked} className="mb-1">  
            <ListGroup>
              <ListGroup.Item action href={`${index}`} onClick={(event) => selectItem(event, index)}>
                <h5 className={electedClass}>{title}</h5>
                <p>{shortDesc}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Col xs={6} className="desc">
          <Tab.Content>
            <Tab.Pane eventKey={`${index}`}>
              <h3 >{title}</h3>
              <p>{fullDesc}</p>
              <div className="d-flex align-items-end flex-column">
                <a href="1" className="text-primary d-block" onClick={this.changeElected}>{elected ? 'Remove from favorites' : 'Add to favorites'}</a>
                <a href="2" className="text-danger d-block" onClick={removeItem}>Remove</a>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </>
    )
  }
} 