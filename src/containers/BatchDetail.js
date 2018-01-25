// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import fetchBatches, { fetchOneBatch } from '../actions/batches/fetch'
import { fetchStudents } from '../actions/students/fetch'
import RandomStudentButton from '../components/RandomStudentButton'


import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import WatchGameIcon from 'material-ui/svg-icons/image/remove-red-eye'
import JoinGameIcon from 'material-ui/svg-icons/social/person-add'
import PlayGameIcon from 'material-ui/svg-icons/hardware/videogame-asset'
import WaitingIcon from 'material-ui/svg-icons/image/timelapse'
import Divider from 'material-ui/Divider'

import './BatchDetail.css'

class BatchDetail extends PureComponent {

  componentWillMount() {
    const { batchId } = this.props.match.params

    this.props.fetchStudents(batchId)
    this.props.fetchOneBatch(batchId)

  }

  giveGrade = (student) => {
    // console.log(student.evaluations[0].evaluationGrade)
    if (student.evaluations.length > 0) {
      return student.evaluations[0].evaluationGrade
    } else {
      return "NOGRADE"
    }
  }

  studentFilter = (students, grade) => {
    return students.filter(student => {
      if (student.evaluations.length > 0) {
        return student.evaluations[0].evaluationGrade === grade
      }
    })
  }

  render() {
    const {batches, students } = this.props

    const filteredStudents = {
      green: this.studentFilter(students, "GREEN"),
      yellow: this.studentFilter(students, "YELLOW"),
      red: this.studentFilter(students, "RED")
    }
    
    return (
      <div className="Batch">
        <Paper className="paper">
          <h1>Batch {batches.batchNumber}</h1>
          <h4>{students.length} students</h4>
        </Paper>
        {console.log(filteredStudents)}
        <RandomStudentButton />

        <div className="studentsContainer">
          {students && (students.map((student, index) =>
            <Paper
              className="paper studentItem"
              data-grade={this.giveGrade(student)}
              key={index} >
              <div
                className="profileImage"
                style={{ backgroundImage: `url(${student.profileImage})` }}></div>
              <h3>{student.name}</h3>
            </Paper>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  batches: state.batches,
  students: state.students
})

export default connect(mapStateToProps, { fetchOneBatch, fetchStudents })(BatchDetail)
