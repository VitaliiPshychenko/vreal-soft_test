import React from 'react';
import { Col, Tab } from 'react-bootstrap';
import { Map } from './Map';


export function PathPage(props) {
  const {
    display,
    id,
    title,
    fullDesc,
    changeElected,
    elected,
    removeItem,
   } = props

  const className = 'desc'
  const isActive = display ? className + ' active' : className + ' not-active';

  return (
    <Col md={6} className={isActive}>
      <Tab.Content className=" pr-2 pb-2">
        <Tab.Pane eventKey={`${id}`}>
          <h3 >{title}</h3>
          <p>{fullDesc}</p>
          <Map
            googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBz7Oa8C8MOOd20FJSUaYQc0lrlLkvn0m4'}
            loadingElement={<div style={{ height: '400px' }} />}
            containerElement={<div style={{ height: '400px' }} />}
            mapElement={<div style={{ height: '400px' }} />}
          />
          <div className="d-flex align-items-end flex-column mt-2">
            <a href="1" className="text-primary d-block" onClick={changeElected}>{elected ? 'Remove from favorites' : 'Add to favorites'}</a>
            <a href="2" className="text-danger d-block" onClick={(event) => removeItem(event, id)}>Remove</a>
          </div>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  )
}

