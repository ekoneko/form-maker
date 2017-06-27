import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class FormMaker extends React.PureComponent<any, any> {
    render() {
        return <div>{this.props.children}</div>
    }
}
export default DragDropContext(HTML5Backend)(FormMaker)
