import React, { Component } from 'react';
import { ListGroup, Col, Tab, Row } from 'react-bootstrap';
import { firestore } from '../firebase';

export class PathItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      elected: null,
      display: false
    }
  }

  componentDidMount = () => {
    this.setState({
      elected: this.props.isElected
    })
  }

  updateElected = (elected) => {
    const dataRef = firestore.doc(`data/${this.props.id}`);
    dataRef.update({elected: !elected})
  }

  displayItem = () => {
    this.setState({
      display: true
    })
  }

  toggleItem = () => {
    this.setState((prevState) => {
      return {
        display: !prevState.display
      }
    })
  }

  changeElected = (event, id) => {
    event.preventDefault();
    const { elected } = this.state;

    if (!elected) {
      this.toggleItem();
      this.setState((prevState) => {
        return {
          elected: !prevState.elected
        };
      });
      this.props.moveUp(event, id);
    } else {
      this.toggleItem();
      this.setState((prevState) => {
        return {
          elected: !prevState.elected
        };
      });
      
      this.props.moveDown(event, id);
    }
    this.updateElected(elected);
  };

  render() {
    const {
      title,
      shortDesc,
      fullDesc,
      id,
      selectItem,
      removeItem,
    } = this.props

    const { display, elected } = this.state;
    const electedClass = elected 
      ? 'position-relative elected'
      : 'position-relative';

    const isActive = display ? 'desc active' : 'desc not-active';

    return (
      <>
        <Row>
          <Col xs={6} onClick={this.displayItem} className="mb-1">
            <ListGroup>
              <ListGroup.Item action href={`${id}`} onClick={(event) => selectItem(event, id)}>
                <h5 className={electedClass}>{title}</h5>
                <p>{shortDesc}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Col xs={6} className={isActive}>
        <Tab.Content>
          <Tab.Pane eventKey={`${id}`}>
            <h3 >{title}</h3>
            <p>{fullDesc}</p>
            <div className="d-flex align-items-end flex-column">
              <a href="1" className="text-primary d-block" onClick={this.changeElected}>{elected ? 'Remove from favorites' : 'Add to favorites'}</a>
              <a href="2" className="text-danger d-block" onClick={(event) => removeItem(event, id)}>Remove</a>
            </div>
          </Tab.Pane>
        </Tab.Content>
        </Col>
      </>
    )
  }
}
