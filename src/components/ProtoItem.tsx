import * as React from 'react'
import { DragSource, ConnectDragSource } from 'react-dnd'
import { DRAG_PROTO_TYPE } from '../consts'

export type protoItemOnChange = (name: string, value: string|boolean|number) => void

export interface protoItemParams {
  [propName: string]: any
}

export interface IProtoListItem {
  type: string;
  params: protoItemParams;
  renderProto: () => JSX.Element;
  renderWork: (params: protoItemParams) => JSX.Element;
  renderEditParam: (params: protoItemParams, onChange: protoItemOnChange) => JSX.Element;
}

export interface IProtoItemProps {
  item: IProtoListItem;
  connectDragSource: ConnectDragSource;
}

class ProtoItemRaw extends React.PureComponent<IProtoItemProps , null> {
  render() {
    const { item, connectDragSource } = this.props
    return connectDragSource(<div>{item.renderProto()}</div>)
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
export const ProtoItem = DragSource(DRAG_PROTO_TYPE, spec, collect)(ProtoItemRaw)
