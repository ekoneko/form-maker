import * as React from 'react'
import { findDOMNode } from 'react-dom'
import {
  DragSource,
  ConnectDragSource,
  DropTarget,
  ConnectDropTarget,
} from 'react-dnd'
import {IProtoListItem} from './ProtoItem'
import { DRAG_WORK_ITEM } from '../consts'

export type editClick = (
  element: JSX.Element,
) => void

export interface IWorkItemProps {
  item: IProtoListItem;
  index: number;
  onClick: editClick;
  onChange: (item: IProtoListItem) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  connectDragSource: ConnectDragSource;
  connectDragTarget: ConnectDropTarget;
}

class WorkItemRaw extends React.PureComponent<IWorkItemProps, any> {
  handleClick = () => {
    const {onClick, item} = this.props
    onClick(item.renderEditParam(item.params, this.handleChange))
  }

  handleChange = (name, value) => {
    const {onChange} = this.props
    const item = {...this.props.item}
    item.params = {
      ...item.params,
      [name]: value,
    }
    onChange(item)
  }

  render() {
    const {
      item,
      connectDragSource,
      connectDragTarget,
    } = this.props
    return connectDragTarget(connectDragSource(
      <div onClick={this.handleClick}>{item.renderWork(item.params)}</div>
    ))
  }
}

const sourceSpec = {
  beginDrag(props) {
    return {
      item: props.item,
      index: props.index,
    }
  },
}
const sourceCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  }
}

const targetSpec = {
  drop(props, monitor, component) {
    //
  },
  hover(props, monitor, component) {
    // from: https://github.com/react-dnd/react-dnd/blob/master/examples/04%20Sortable/Simple/Card.js
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    props.onMove(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
}

const targetCollect = (connect, monitor) => {
  return {
    connectDragTarget: connect.dropTarget()
  }
}

export const WorkItem = DropTarget([DRAG_WORK_ITEM], targetSpec, targetCollect)(
  DragSource(DRAG_WORK_ITEM, sourceSpec, sourceCollect)(WorkItemRaw)
)
