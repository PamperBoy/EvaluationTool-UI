// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

// import { fetchOneBatch } from '../actions/batches/fetch'
import { fetchStudents } from '../actions/students/fetch'


import Paper from 'material-ui/Paper'

import './BatchDetail.css'

class StudentDetail extends PureComponent {

  componentWillMount() {
    const { batchId } = this.props.match.params
    this.props.fetchStudents(batchId)
  }


  render() {
    console.log("hoi");
    return (
      <div className="Batch">

        <Paper className="paper">
          <h4>student</h4>
        </Paper>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  students: state.students
})

export default connect(mapStateToProps, {fetchStudents})(StudentDetail)
