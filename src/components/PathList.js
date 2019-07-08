import React from 'react';
import { PathItem } from './PathItem';

export function PathList (props) {
  const {
    selectItem,
    removeItem,
    moveUp,
    moveDown,
    changeElected,
    pathList
  } = props

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
  );
}