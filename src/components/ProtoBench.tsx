import * as React from 'react'

import { ProtoItem, IProtoListItem } from './ProtoItem'

export interface IProtoBenchProps {
  protoList: Array<IProtoListItem>;
}

export class ProtoBench extends React.PureComponent<IProtoBenchProps, null> {
  render() {
    const { protoList } = this.props
    return (
      <div>
        {protoList.map(item => <ProtoItem key={item.type} item={item} />)}
      </div>
    )
  }
}
