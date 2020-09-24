import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './ListDnd.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = (list) =>
  list.map((element) => ({
    id: `${element.id}`,
    content: element.name,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 3;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? '#d4d4d4' : '#d6d6d6',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default class ListDnd extends Component {
  state = {
    first: getItems(this.props.first),
    middle: getItems(this.props.middle),
    last: getItems(this.props.last),
  };

  /**
   * Moves an item from one list to another list.
   */
  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    this.props.onChange(removed.id);

    destClone.push(removed, destination);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: 'first',
    droppable2: 'middle',
    droppable3: 'last',
  };

  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = (evt) => {
    const { source, destination } = evt;

    // dropped outside the list
    if (!destination) {
      return;
    }
    if (
      (source.droppableId === 'droppable2' &&
        destination.droppableId === 'droppable') ||
      (source.droppableId === 'droppable3' &&
        destination.droppableId === 'droppable2') ||
      (source.droppableId === 'droppable3' &&
        destination.droppableId === 'droppable') ||
      (source.droppableId === 'droppable' &&
        destination.droppableId === 'droppable3') ||
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    const result = this.move(
      this.getList(source.droppableId),
      this.getList(destination.droppableId),
      source,
      destination
    );
    if (
      source.droppableId === 'droppable' &&
      destination.droppableId === 'droppable2'
    ) {
      this.setState({
        first: result.droppable,
        middle: result.droppable2,
      });
    } else {
      this.setState({
        middle: result.droppable2,
        last: result.droppable3,
      });
    }
  };

  renderDroppable = (id, list) => (
    <Droppable key={'Droppable-' + id} droppableId={id}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} className={styles.droppapble}>
          {list.map((item, index) => this.renderDraggable(item, index))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  renderDraggable = (item, index) => {
    if (item.id) {
      return (
        <Draggable
          key={'Draggable-' + item.id}
          draggableId={'Draggable-' + item.id}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              {item.content}
            </div>
          )}
        </Draggable>
      );
    }
  };

  renderHeaders = () => (
    <thead>
      <tr>
        {this.props.headers.map((header, index) => (
          <td key={`td-${index}`}>{header}</td>
        ))}
      </tr>
    </thead>
  );

  render() {
    return (
      <div className={styles.list}>
        <table>{this.renderHeaders()}</table>
        <div className={styles['draggable-context']}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.renderDroppable('droppable', this.state.first)}
            {this.renderDroppable('droppable2', this.state.middle)}
            {this.renderDroppable('droppable3', this.state.last)}
          </DragDropContext>
        </div>
      </div>
    );
  }
}
