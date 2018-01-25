// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

// import { fetchOneBatch } from '../actions/batches/fetch'
import { fetchStudents } from '../actions/students/fetch'


import Paper from 'material-ui/Paper'

import './StudentDetail.css'

class StudentDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { currentStudent: {},
                   nextStudent: {},
                   updated: false
                 }
  }

  componentWillMount() {
    const { batchId, studentId } = this.props.match.params
    this.props.fetchStudents(batchId)
  }

  componentDidUpdate() {
    this.setStudentStates(this.findStudentIndex())
  }


  findStudentIndex = () => {
      let index = this.props.students.findIndex(student => student._id === this.props.match.params.studentId);
      return index
  }

  setStudentStates = (index) => {
    this.setState({
      currentStudent: this.props.students[index],
      nextStudent: this.props.students[
        index === this.props.students.length -1 ? 0 : index + 1
      ],
      updated: true
    })
  }

  giveGrade = (student) => {
    if (student.evaluations.length > 0) {
      return student.evaluations[0].evaluationGrade
    } else {
      return "NOGRADE"
    }
  }

  insertAttribute = () => {
    if (this.state.updated) {
      return this.state.currentStudent.evaluations[0].evaluationGrade
    }
  }

  render() {
    const { currentStudent, nextStudent, updated } = this.state
    return (
      <div className="Batch">

        <Paper className="paper studentHeader"
          data-grade={this.insertAttribute()}
          >
          <div
            className="profileImage"
            style={{ backgroundImage: `url(${currentStudent.profileImage})` }}></div>
            <div className="infoWrapper">
              <h1>{currentStudent.name}</h1>
            </div>
        </Paper>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  students: state.students
})

export default connect(mapStateToProps, {fetchStudents})(StudentDetail)
