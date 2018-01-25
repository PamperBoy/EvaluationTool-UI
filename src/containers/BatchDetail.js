// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import { fetchStudents } from '../actions/students/fetch'
import RandomStudentButton from '../components/RandomStudentButton'
import Modal from '../components/Modal'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'

import './BatchDetail.css'

class BatchDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { isOpen: false,
                   randomStudent: {}
                 }
  }

  componentWillMount() {
    const { batchId } = this.props.match.params
    console.log(this.props.match.url);

    this.props.fetchStudents(batchId)
    this.props.fetchOneBatch(batchId)
  }

  goToBatch = studentId => event => this.props.push(`${this.props.match.url}/student/${studentId}`)


  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  setRandomStudent = (student) => {
    this.setState({
      randomStudent: student
    })
  }

  giveGrade = (student) => {
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

  pools = (students) => {
    return {
      green: this.studentFilter(students, "GREEN"),
      yellow: this.studentFilter(students, "YELLOW"),
      red: this.studentFilter(students, "RED")
    }
  }

  pickRandom = (students) => {
    if (students) {

      let randomNumber = Math.floor(Math.random() * 100) + 1
      const chanceGreen = 21
      const chanceYellow = chanceGreen + 32

      const randomStudentNumber = (poolLength) => {
        return Math.floor(Math.random() * poolLength.length)
      }

      const green =   this.studentFilter(students, "GREEN")
      const yellow = this.studentFilter(students, "YELLOW")
      const red = this.studentFilter(students, "RED")

      if (randomNumber <= chanceGreen) {
        let student = green[randomStudentNumber(green)]
        this.setRandomStudent(student)

      } else if (randomNumber <= chanceYellow) {
        let student = yellow[randomStudentNumber(yellow)]
        this.setRandomStudent(student)

      } else {
        let student = red[randomStudentNumber(red)]
        this.setRandomStudent(student)
      }
    }
  }

  render() {
    const {batches, students } = this.props

    return (
      <div className="Batch">

        <Paper className="paper">
          <h1>Batch {batches.batchNumber}</h1>
          <h4>{students.length} students</h4>
        </Paper>

        <RandomStudentButton onClick={() => {this.pickRandom(students), this.toggleModal()}} />

        <div className="studentsContainer">
          {students && (students.map((student, index) =>

            <Paper
              className="paper studentItem"
              data-grade={this.giveGrade(student)}
              key={index}
              onClick={this.goToBatch(student._id)}

              >
              <div
                className="profileImage"
                style={{ backgroundImage: `url(${student.profileImage})` }}></div>
                <h3>{student.name}</h3>
            </Paper>
          ))}
        </div>
        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}
          student={this.state.randomStudent}
          grade={"RED"}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  batches: state.batches,
  students: state.students
})

export default connect(mapStateToProps, { fetchOneBatch, fetchStudents, push})(BatchDetail)
