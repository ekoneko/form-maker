import * as React from 'react'

export interface IEditBenchProps {
  style?: {}
}

export class EditBench extends React.Component<IEditBenchProps, any> {
  static contextTypes = {
    editForm: React.PropTypes.element
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps !== this.props) {
      return true;
    }
    if (nextContext !== this.context) {
      return true;
    }
    return false;
  }

  render() {
    const {style} = this.props;
    const {editForm} = this.context;
    return <div style={style}>{editForm}</div>
  }
}
