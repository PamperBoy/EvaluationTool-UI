// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import authCheck from '../actions/authCheck'
import EvaluationForm from './EvaluationForm'
import { fetchStudents } from '../actions/students/fetch'

import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField';

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
    const { batchId } = this.props.match.params
    this.props.fetchStudents(batchId)
    this.props.authCheck()
  }

  componentDidUpdate() {
    this.setStudentStates(this.findStudentIndex())
  }

  goToStudent = studentId => event => this.props.push(`${studentId}`)

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
    let evaluations = this.state.currentStudent.evaluations
    if (this.state.updated && evaluations.length > 0) {
      return evaluations[0].evaluationGrade
    }
    return "NOGRADE"
  }

  render() {
    const { currentStudent, nextStudent, updated } = this.state
    const { batchId, studentId } = this.props.match.params

    return (
      <div className="Batch">

        <Paper className="paper studentHeader"
          data-grade={this.insertAttribute()}
          >

          <div
            className="profileImage"
            style={{ backgroundImage: `url(${currentStudent.profileImage})` }}>
          </div>

          <div className="infoWrapper">
            <h1>{currentStudent.name}</h1>
          </div>

        </Paper>

        <EvaluationForm
          nextStudent={this.goToStudent(this.state.nextStudent._id)}
          studentId={studentId}
          batchId={batchId}
        />

        <div className="evaluationsContainer">
          {updated && (currentStudent.evaluations.map((evaluation, index) =>

            <Paper
              className="paper evaluationItem"
              data-grade={evaluation.evaluationGrade}
              key={index}
              >
              <h3>{evaluation.evaluationDate}</h3>
              <TextField
                hintText="Full width"
                fullWidth={true}
                multiLine={true}
                rows={5}
                rowsMax={10}
                value={evaluation.evaluationRemark}
              />
            </Paper>

          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  students: state.students
})

export default connect(mapStateToProps, {fetchStudents, authCheck, push})(StudentDetail)
