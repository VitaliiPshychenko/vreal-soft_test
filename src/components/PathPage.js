import React from 'react';
import { ListGroup, Col, Tab } from 'react-bootstrap';


export function PathPage(props) {
  const {
    isActive,
    id,
    title,
    fullDesc,
    changeElected,
    elected,
    removeItem,
   } = props

  return (
    <Col md={6} className={isActive}>
      <Tab.Content>
        <Tab.Pane eventKey={`${id}`}>
          <h3 >{title}</h3>
          <p>{fullDesc}</p>
          <div className="d-flex align-items-end flex-column">
            <a href="1" className="text-primary d-block" onClick={changeElected}>{elected ? 'Remove from favorites' : 'Add to favorites'}</a>
            <a href="2" className="text-danger d-block" onClick={(event) => removeItem(event, id)}>Remove</a>
          </div>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  )
}

