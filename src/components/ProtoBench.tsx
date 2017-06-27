import * as React from 'react'

import ProtoItem from './ProtoItem'

class ProtoBench extends React.PureComponent<any, any> {
    render() {

        return (
            <div>
                <ProtoItem id="1">1</ProtoItem>
                <ProtoItem id="2">2</ProtoItem>
            </div>
        )
    }
}
export default ProtoBench
