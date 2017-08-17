import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class FormMakerRaw extends React.PureComponent<any, any> {
  static childContextTypes = {
    editForm: React.PropTypes.element,
    setEditForm: React.PropTypes.func,
  }

  state = {
    editForm: null
  }

  getChildContext() {
    return {
      editForm: this.state.editForm,
      setEditForm: this.setEditForm,
    }
  }

  setEditForm = (editForm) => {
    this.setState({'editForm': editForm});
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export const FormMaker = DragDropContext(HTML5Backend)(FormMakerRaw)
