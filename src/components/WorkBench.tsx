import * as React from 'react'
import { DropTarget, connectDropTarget } from 'react-dnd'
import { DRAG_PROTO_ITEM } from '../consts'
import { IProtoListItem } from './ProtoItem'
import { WorkItem, editClick } from './WorkItem'
import {Simulate} from "react-dom/test-utils";
import drag = Simulate.drag;

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

  /**
   * Trigger when dropping an item from proto bench
   */
  handleDrop = (item: IProtoListItem) => {
    const {workItems} = this.state
    workItems.push(item)
    this.setState({workItems})
  }

  /**
   * Trigger when dragging and sorting from work bench
   */
  handleMove = (dragIndex: number, hoverIndex: number) => {
    const newWorkItems = [...this.state.workItems]
    newWorkItems.splice(hoverIndex, 0, newWorkItems.splice(dragIndex, 1)[0]);
    this.setState({workItems: newWorkItems})
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
        {workItems.map((item, index) => (
          <WorkItem
            index={index}
            key={item.id}
            item={item}
            onClick={onEditClick}
            onChange={this.handleChange}
            onMove={this.handleMove}
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
    const { item } = monitor.getItem()
    item.id = genGid()
    component.handleDrop(item)
    component.forceUpdate() // TODO: better way?
    return {item}
  },
}
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}
export const WorkBench = DropTarget([
  DRAG_PROTO_ITEM,
], spec, collect)(WorkBenchRaw)
