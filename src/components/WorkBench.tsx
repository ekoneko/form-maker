import * as React from 'react'
import { DropTarget, connectDropTarget } from 'react-dnd'
import { DRAG_PROTO_TYPE, DRAG_WORK_TYPE } from '../consts'
import { IProtoListItem } from './ProtoItem'
import { WorkItem, editClick } from './WorkItem'

export interface IWorkBenchProps {
  connectDropTarget: connectDropTarget;
  style?: {};
  onEditClick: editClick;
}

class WorkBenchRaw extends React.PureComponent<IWorkBenchProps, any> {
  static defaultProps = {
    style: {}
  }

  state = {
    workItems: [] = [],
  }

  handleDrop = (item: IProtoListItem) => {
    const {workItems} = this.state
    workItems.push(item)
    this.setState({workItems})
  }

  handleChange = (item) => {
    const workItems = [...this.state.workItems]
    for (let i = 0; i < workItems.length; i++) {
      if (workItems[i].id === item.id) {
        workItems[i] = item
        break
      }
    }
    this.setState({workItems})
  }

  render() {
    const { style, connectDropTarget, onEditClick } = this.props
    const { workItems } = this.state
    return connectDropTarget(
      <div style={style}>
        {workItems.map(item => (
          <WorkItem
            key={item.id}
            item={item}
            onClick={onEditClick}
            onChange={this.handleChange}
          />
        ))}
      </div>
    )
  }
}
let gid = 0
function genGid(): string {
  gid += 1
  return gid.toString()
}
const spec = {
  drop(props, monitor, component) {
    const {item} = monitor.getItem()
    item.id = genGid()
    component.handleDrop(item)
    component.forceUpdate() // TODO: better way?
  },
}
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}
export const WorkBench = DropTarget([
  DRAG_PROTO_TYPE,
  DRAG_WORK_TYPE,
], spec, collect)(WorkBenchRaw)
