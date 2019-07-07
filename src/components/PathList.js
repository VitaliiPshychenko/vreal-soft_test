import React, { Component }from 'react';
import { PathItem } from './PathItem';
import { PathPage } from './PathPage';
import { Col } from 'react-bootstrap';


export class PathList extends Component {

  constructor(props) {
    super(props);


  }

  render() {
    const {
      selectItem,
      removeItem,
      moveUp,
      moveDown,
      changeElected,
      pathList
    } = this.props

    return (
      <div>
        {pathList.map(item => {
          return (
            <PathItem
              key={item.id}
              selectItem={selectItem}
              removeItem={removeItem}
              moveUp={moveUp}
              moveDown={moveDown}
              changeElected={changeElected}
              isElected={item.elected}
              id={item.id}
              title={item.title}
              shortDesc={item.shortDesc}
              fullDesc={item.fullDesc}
            />
          )
        })}      
      </div>
    )
  }
}