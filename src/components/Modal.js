import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import './Modal.css'


class Modal extends React.Component {
  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <Paper className="modal"
          data-grade={this.props.student.evaluations[0].evaluationGrade}>
          <div
          className="profileImage"
          style={{ backgroundImage: `url(${this.props.student.profileImage})` }}>
          </div>
          <CloseIcon
            className="modalClose"
            onClick={this.props.onClose} />
          <div className="footer">
            <h2 className="modalTitle">{this.props.student.name}</h2>
          </div>
        </Paper>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
