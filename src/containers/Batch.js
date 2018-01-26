import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../actions/batches/fetch'
import authCheck from '../actions/authCheck'
import BatchForm from './BatchForm'

import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider';

import './Batch.css'

class Batch extends PureComponent {
  componentWillMount() {
    this.props.fetchBatches()
    this.props.authCheck()
  }

  goToBatch = batchId => event => this.props.push(`/batch/${batchId}`)

  renderDevider = (index) => {
    if (this.props.batches.length > index +1) { return <Divider /> }
  }

  render() {
    const {batches} = this.props

    return (
      <div className="Batch">
        <BatchForm nextBatchNumber={batches.length}/>
        <Paper className="paper">
          <Menu>
            {batches && (batches.map((batch, index) =>
              <div key={index}>
              <MenuItem
                key={index}
                onClick={this.goToBatch(batch._id)}
                primaryText={`Batch ${batch.batchNumber}`}
                secondaryText={"students #"} />
              {this.renderDevider(index)}
              </div>
            ))}
          </Menu>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  batches: state.batches
})
export default connect(mapStateToProps, { fetchBatches, authCheck,push })(Batch)
