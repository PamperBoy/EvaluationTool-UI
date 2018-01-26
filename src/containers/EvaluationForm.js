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

  updateEvaluationGrade(event) {
    this.setState({
      evaluationGrade: event.target.value
    })
  }

  updateEvaluationRemark(event) {
    this.setState({
      evaluationRemark: event.target.value
    })
  }

  saveEvaluation() {
    // const evaluation = { ...this.state }
    // this.props.createBatch(evaluation)
    this.props.nextStudent()
  }

  render() {
    return (
      <Paper className="paperForm addTopMargin" zDepth={2}>
        <h2>Create a batch</h2>
        <form
        className="evaluationForm"
        onSubmit={this.saveEvaluation.bind(this)}>

          <DatePicker
            textFieldStyle={{width: `100%`}}
            className="input evaluationDate"
            hintText="Start date"
            ref="evaluationDate"
            defaultValue={this.state.evaluationDate}
            value={this.state.evaluationDate}
            onChange={this.updateEvaluationDate}
            onKeyDown={this.updateEvaluationDate.bind(this)}
            />

          <TextField
            textFieldStyle={{width: `100%`}}
            className="input batchNumber"
            type="text"
            ref="batchNumber"
            hintText="Batch Number"
            defaultValue={this.props.nextBatchNumber}
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
              onClick={this.saveEvaluation.bind(this)}
              label="Save and next"/>
          </div>
        </form>
      </Paper>
      )
    }
  }

const mapDispatchToProps = { createEvaluation }

export default connect(null, mapDispatchToProps)(EvaluationForm)
