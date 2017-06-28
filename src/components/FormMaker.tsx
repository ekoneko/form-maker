import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class FormMakerRaw extends React.PureComponent<any, any> {
  render() {
    return <div>{this.props.children}</div>
  }
}
export const FormMaker = DragDropContext(HTML5Backend)(FormMakerRaw)
