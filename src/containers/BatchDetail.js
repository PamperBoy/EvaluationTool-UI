// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import fetchBatches, { fetchOneBatch } from '../actions/batches/fetch'
import { fetchStudents } from '../actions/students/fetch'
import RandomStudentButton from '../components/RandomStudentButton'
import Modal from '../components/Modal';


import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import WatchGameIcon from 'material-ui/svg-icons/image/remove-red-eye'
import JoinGameIcon from 'material-ui/svg-icons/social/person-add'
import PlayGameIcon from 'material-ui/svg-icons/hardware/videogame-asset'
import Divider from 'material-ui/Divider'

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

    this.props.fetchStudents(batchId)
    this.props.fetchOneBatch(batchId)

  }

  componentDidMount() {
    {console.log(this.pickRandom())}
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
    console.log(this.state.randomStudent);
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
      // let derp = this.pools(students)
      // console.log(derp);

      console.log(randomNumber);
      if (randomNumber <= chanceGreen) {
        let student = green[randomStudentNumber(green)]
        this.setRandomStudent(student)
        console.log(this.state.randomStudent);

      } else if (randomNumber <= chanceYellow) {
        let student = yellow[randomStudentNumber(yellow)]
        this.setRandomStudent(student)
        console.log(this.state.randomStudent);

      } else {
        let student = red[randomStudentNumber(red)]
        this.setRandomStudent(student)
        console.log(this.state.randomStudent);

      }
    }
  }

  test = () => {
    console.log(this.pickRandom);
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

        <RandomStudentButton onClick={() => {this.pickRandom(students), this.toggleModal()}} />

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

export default connect(mapStateToProps, { fetchOneBatch, fetchStudents })(BatchDetail)
