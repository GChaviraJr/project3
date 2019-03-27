import React from 'react';
import ReactDOM from 'react-dom';

const selectedRoot = document.getElementById('selected-root');

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.elSelected = document.createElement('div');
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
      selectedRoot.appendChild(this.elSelected);
  }

  componentWillUnmount() {
    selectedRoot.removeChild(this.elSelected);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.elSelected,
    );
  }
}

export default Select;