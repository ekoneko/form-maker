import * as React from 'react'
import { DragSource, ConnectDragSource } from 'react-dnd'
import {IProtoListItem} from './ProtoItem'
import { DRAG_WORK_TYPE } from '../consts'

export type editClick = (
  element: JSX.Element,
) => void

export interface IWorkItemProps {
  item: IProtoListItem;
  onClick: editClick;
  onChange: (item: IProtoListItem) => void;
  connectDragSource: ConnectDragSource;
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
    const {item, connectDragSource} = this.props
    return connectDragSource(
      <div onClick={this.handleClick}>{item.renderWork(item.params)}</div>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {item: {...props.item}}
  },
}
const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  }
}

export const WorkItem = DragSource(DRAG_WORK_TYPE, spec, collect)(WorkItemRaw)
