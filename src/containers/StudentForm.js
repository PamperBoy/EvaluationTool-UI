import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createStudent from '../actions/students/create'

import Paper from 'material-ui/Paper'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import './BatchForm.css'

class StudentForm extends PureComponent {
  constructor(props) {
    super(props)

    const { name, profileImage, endDate } = props

    this.state = {
      name,
      profileImage,
      endDate
    }
  }

  updateName(event) {
    this.setState({
      name: event.target.value
    })
  }

  updateProfileImage(event) {
    this.setState({
      profileImage: event.target.value
    })
  }

  saveStudent() {
    const student = { ...this.state }
    this.props.createStudent(this.props.batchId, student)
  }

render() {
  return (
    <Paper className="paperForm" zDepth={2}>
      <h2>Add a student</h2>
      <form
      className="batchForm"
      onSubmit={this.saveStudent.bind(this)}>

        <TextField
          textFieldStyle={{width: `100%`}}
          className="input name"
          type="text"
          ref="name"
          hintText="Full name"
          onChange={this.updateName.bind(this)}
          onKeyDown={this.updateName.bind(this)}
        />

        <TextField
          textFieldStyle={{width: `100%`}}
          className="input profileImage"
          type="text"
          ref="profileImage"
          hintText="Image link"
          onChange={this.updateProfileImage.bind(this)}
          onKeyDown={this.updateProfileImage.bind(this)}
        />


        <div className="buttonWrapper">
          <RaisedButton
            fullWidth={true}
            primary={true}
            onClick={this.saveStudent.bind(this)}
            label="Add student"/>
        </div>
      </form>
    </Paper>
    )
  }
}

const mapDispatchToProps = { createStudent }

export default connect(null, mapDispatchToProps)(StudentForm)
