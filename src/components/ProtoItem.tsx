import * as React from 'react'
import { DragSource } from 'react-dnd'
import { DRAG_PROTO_TYPE } from '../consts'

class ProtoItem extends React.PureComponent<any, any> {
    render() {
        const { connectDragSource } = this.props
        return connectDragSource(<span>{this.props.children}</span>)
    }
}
const spec = {
    beginDrag(props) {
        return {id: props.id}
    },
    endDrag(props, monitor) {
        console.log(monitor.getDropResult())
        return
    }
}
const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    }
}
export default DragSource(DRAG_PROTO_TYPE, spec, collect)(ProtoItem)
