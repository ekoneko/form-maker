import * as React from 'react'
import { DropTarget, connectDropTarget } from 'react-dnd'
import { DRAG_PROTO_ITEM } from '../consts'
import { IProtoListItem } from './ProtoItem'
import { WorkItem } from './WorkItem'

export interface IResult {
  type: string,
  params: {},
}

export interface IWorkBenchProps {
  connectDropTarget: connectDropTarget;
  onChange?: ([IResult]) => void;
  style?: {};
}

class WorkBenchRaw extends React.PureComponent<IWorkBenchProps, any> {
  static defaultProps = {
    style: {},
    onChange: () => {},
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
    this.changeWorkItems(workItems)
  }

  /**
   * Trigger when dragging and sorting from work bench
   */
  handleMove = (dragIndex: number, hoverIndex: number) => {
    const newWorkItems = [...this.state.workItems]
    newWorkItems.splice(hoverIndex, 0, newWorkItems.splice(dragIndex, 1)[0])
    this.changeWorkItems(newWorkItems)
  }

  handleChange = (item) => {
    const workItems = [...this.state.workItems]
    for (let i = 0; i < workItems.length; i++) {
      if (workItems[i].id === item.id) {
        workItems[i] = item
        break
      }
    }
    this.changeWorkItems(workItems)
  }

  changeWorkItems = (workItems) => {
    const {onChange} = this.props;
    const result = workItems.map(items => {
      const {type, params} = items;
      return {type, params};
    })
    onChange(result);
    this.setState({workItems})
  }

  render() {
    const { style, connectDropTarget } = this.props
    const { workItems } = this.state
    return connectDropTarget(
      <div style={style}>
        {workItems.map((item, index) => (
          <WorkItem
            index={index}
            key={item.id}
            item={item}
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
