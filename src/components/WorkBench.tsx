import * as React from 'react'
import { DropTarget } from 'react-dnd'
import { DRAG_PROTO_TYPE } from '../consts'

class WorkBench extends React.PureComponent<any, any> {
    render() {
        const { connectDropTarget } = this.props
        return connectDropTarget(
            <div style={{
                width: 100,
                height: 100,
                border: '1px dashed #ccc'
            }}>
            </div>
        )
    }
}
const spec = {
    drop(props, monitor, component) {
        const {id} = monitor.getItem()
        return {id}
    },
}
const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}
export default DropTarget([DRAG_PROTO_TYPE], spec, collect)(WorkBench)
