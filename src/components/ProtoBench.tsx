import * as React from 'react'

import { ProtoItem, IProtoListItem } from './ProtoItem'

export interface IProtoBenchProps {
  protoList: Array<IProtoListItem>;
  style?: {};
}

export class ProtoBench extends React.PureComponent<IProtoBenchProps, null> {
  static defaultProps = {
    style: {}
  }

  render() {
    const { protoList, style } = this.props
    return (
      <div style={style}>
        {protoList.map(item => <ProtoItem key={item.type} item={item} />)}
      </div>
    )
  }
}
