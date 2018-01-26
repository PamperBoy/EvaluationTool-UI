import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import createBatch from '../actions/batches/create'

import Paper from 'material-ui/Paper'
import DatePicker from 'material-ui/DatePicker'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import './BatchForm.css'

class BatchForm extends PureComponent {
  constructor(props) {
    super(props)

    const { batchNumber, startDate, endDate } = props

    this.state = {
      batchNumber,
      startDate,
      endDate
    }
  }

  updateBatchNumber(event) {
    this.setState({
      batchNumber: event.target.value
    })
  }

  updateStartDate = (event, date) => {
    this.setState({startDate: date})
  }

  updateEndDate = (event, date) => {
    this.setState({endDate: date})
  }

  saveBatch() {
    const batch = { ...this.state }
    this.props.createBatch(batch)
  }

render() {
  return (
    <Paper className="paperForm" zDepth={2}>
      <h2>Create a batch</h2>
      <form
      className="batchForm"
      onSubmit={this.saveBatch.bind(this)}>

        <TextField
          textFieldStyle={{width: `100%`}}
          className="input batchNumber"
          type="text"
          ref="batchNumber"
          hintText="Batch Number"
          defaultValue={this.props.nextBatchNumber}
          onChange={this.updateBatchNumber.bind(this)}
          onKeyDown={this.updateBatchNumber.bind(this)}
        />

        <DatePicker
          textFieldStyle={{width: `100%`}}
          className="input startDate"
          hintText="Start date"
          ref="startDate"
          defaultValue={this.state.startDate}
          value={this.state.startDate}
          onChange={this.updateStartDate}
          onKeyDown={this.updateStartDate.bind(this)}
        />

        <DatePicker
          textFieldStyle={{width: `100%`}}
          className="input endDate"
          hintText="End date"
          ref="endDate"
          defaultValue={this.state.endDate}
          value={this.state.endDate}
          onChange={this.updateEndDate}
          onKeyDown={this.updateEndDate.bind(this)}
        />


        <div className="buttonWrapper">
          <RaisedButton
            fullWidth={true}
            primary={true}
            onClick={this.saveBatch.bind(this)}
            label="Create Batch"/>
        </div>
      </form>
    </Paper>
    )
  }
}

const mapDispatchToProps = { createBatch }

export default connect(null, mapDispatchToProps)(BatchForm)
