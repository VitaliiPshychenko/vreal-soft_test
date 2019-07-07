import React, { Component } from 'react';
import { ListGroup, Col, Tab, Row } from 'react-bootstrap';
import { firestore } from '../firebase';
import { PathPage } from './PathPage';

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
        
          <Col md={6} onClick={this.displayItem} className="mb-1">
            <ListGroup>
              <ListGroup.Item action href={`${id}`} onClick={(event) => selectItem(event, id)}>
                <h5 className={electedClass}>{title}</h5>
                <p>{shortDesc}</p>
              </ListGroup.Item>
            </ListGroup>
           
          </Col>
          <PathPage
            isActive={isActive}
            id={id}
            title={title}
            fullDesc={fullDesc}
            changeElected={this.changeElected}
            elected={elected}
            removeItem={removeItem}
          />
      </>
    )
  }
}