import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import { fetchStudents } from '../actions/students/fetch'
import RandomStudentButton from '../components/RandomStudentButton'
import Modal from '../components/Modal'
import { push } from 'react-router-redux'
import authCheck from '../actions/authCheck'
import StudentForm from './StudentForm'


import Paper from 'material-ui/Paper'

import './BatchDetail.css'

class BatchDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { isOpen: false,
                   randomStudent: {},
                   batchNumber: ""
                 }
  }

  componentWillMount() {
    const { batchId } = this.props.match.params

    this.props.fetchStudents(batchId)
    this.props.fetchOneBatch(batchId)
    this.props.authCheck()
  }

  componentDidUpdate() {
    this.setState({
      batchNumber: this.props.batches.length
    })
  }

  goToBatch = studentId => event => {
    this.props.push(`${this.props.match.url}/student/${studentId}`)
  }

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
    if (student.evaluations && student.evaluations.length > 0) {
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

  pickRandom = (students) => {
    if (students) {

      let randomNumber = Math.floor(Math.random() * 100) + 1
      const chanceGreen = 21
      const chanceYellow = chanceGreen + 32 // 53

      const greenPool =   this.studentFilter(students, "GREEN")
      const yellowPool = this.studentFilter(students, "YELLOW")
      const redPool = this.studentFilter(students, "RED")

      const randomStudentNumber = (poolLength) => {
        return Math.floor(Math.random() * poolLength.length)
      }

      if (randomNumber <= chanceGreen) {
        let student = greenPool[randomStudentNumber(greenPool)]
        this.setRandomStudent(student)

      } else if (randomNumber <= chanceYellow) {
        let student = yellowPool[randomStudentNumber(yellowPool)]
        this.setRandomStudent(student)

      } else {
        let student = redPool[randomStudentNumber(redPool)]
        this.setRandomStudent(student)
      }
    }
  }

  render() {
    const { batches, students } = this.props

    return (
      <div className="Batch">

        <Paper className="paper" zDepth={4} style={{marginBottom: 40}}>
          <h1>Batch {this.state.batchNumber}</h1>
          <h4>{students.length} students</h4>
        </Paper>

        <StudentForm batchId={this.props.match.params.batchId}/>

        <RandomStudentButton onClick={
            () => { this.pickRandom(students), this.toggleModal() }
          } />

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
                style={{ backgroundImage: `url(${student.profileImage})` }}>
              </div>

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

export default connect(mapStateToProps, { fetchOneBatch, fetchStudents, authCheck, push})(BatchDetail)
