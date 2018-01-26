import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createEvaluation from '../actions/evaluations/create'

import Paper from 'material-ui/Paper'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import './EvaluationForm.css'

class EvaluationForm extends PureComponent {
  constructor(props) {
    super(props)

    const { evaluationDate, evaluationGrade, evaluationRemark } = props

    this.state = {
      evaluationDate,
      evaluationGrade,
      evaluationRemark
    }
  }

  updateEvaluationDate = (event, date) => {
    this.setState({evaluationDate: date})
  }

  updateEvaluationGrade(color) {
    this.setState({
      evaluationGrade: color
    })

    console.log(color);
  }

  updateEvaluationRemark(event) {
    this.setState({
      evaluationRemark: event.target.value
    })
  }

  saveEvaluation() {
    const { batchId, studentId } = this.props

    const evaluation = { ...this.state }
    this.props.createEvaluation(batchId, studentId, evaluation)
  }

  saveEvaluationAndNext() {
    // const { batchId, studentId } = this.props

    // const evaluation = { ...this.state }
    // this.props.createEvaluation(batchId, studentId, evaluation)
    this.props.nextStudent()
  }

  render() {
    return (
      <Paper className="paperForm addTopMargin" zDepth={2}>
        <h2>Add evaluation</h2>
        <form
        className="evaluationForm"
        onSubmit={this.saveEvaluation.bind(this)}>

          <div className="gradeButtons">
            <RaisedButton
              backgroundColor="#49b50e"
              style={{marginRight: 20}}
              primary={false}
              onClick={() => this.updateEvaluationGrade("GREEN")}
              label="green"/>
            <RaisedButton
              backgroundColor="#f9d81b"
              style={{marginRight: 20}}
              primary={false}
              onClick={() => this.updateEvaluationGrade("YELLOW")}
              label="yellow"/>
            <RaisedButton
              backgroundColor="rgb(211, 47, 47)"
              style={{marginRight: 20}}
              primary={false}
              onClick={() => this.updateEvaluationGrade("RED")}
              label="red"/>
          </div>

          <DatePicker
            textFieldStyle={{width: `100%`}}
            className="input evaluationDate"
            hintText="Evaluation date"
            ref="evaluationDate"
            defaultValue={this.state.evaluationDate}
            value={this.state.evaluationDate}
            onChange={this.updateEvaluationDate}
            onKeyDown={this.updateEvaluationDate.bind(this)}
            />

          <TextField
            hintText="Add a remark"
            fullWidth={true}
            multiLine={true}
            rows={5}
            rowsMax={10}
            defaultValue={this.state.evaluationRemark}
            onChange={this.updateEvaluationRemark.bind(this)}
            onKeyDown={this.updateEvaluationRemark.bind(this)}
          />

          <div className="buttonWrapper">
            <RaisedButton
              style={{marginRight: 20}}
              primary={false}
              onClick={this.saveEvaluation.bind(this)}
              label="Save"/>

            <RaisedButton
              primary={true}
              onClick={this.saveEvaluationAndNext.bind(this)}
              label="Save and next"/>
          </div>
        </form>
      </Paper>
      )
    }
  }

const mapDispatchToProps = { createEvaluation }

export default connect(null, mapDispatchToProps)(EvaluationForm)
