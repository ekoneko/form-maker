import * as React from 'react'
import {IProtoListItem} from './ProtoItem'

export type editClick = (
  element: JSX.Element,
) => void

export interface IWorkItemProps {
  item: IProtoListItem;
  onClick: editClick;
  onChange: (item: IProtoListItem) => void
}

export class WorkItem extends React.PureComponent<IWorkItemProps, any> {
  handleClick = () => {
    const {onClick, item} = this.props
    onClick(item.renderEditParam(item.params, this.handleChange))
  }

  handleChange = (name, value) => {
    const item = {...this.props.item}
    item.params[name] = value
  }

  render() {
    const {item} = this.props
    return <div onClick={this.handleClick}>{item.renderWork(item.params)}</div>
  }
}
