// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../actions/batches/fetch'
import authCheck from '../actions/authCheck'

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

    console.log(this.props);
    return (
      <div className="Batch">
        <h1>Lobby!</h1>
        <Paper className="paper">
          <Menu>
            {this.props.batches && (this.props.batches.map((batch, index) =>
              <div>
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

// const mapStateToProps = ({ batches, currentUser }) => ({ batches, currentUser })
const mapStateToProps = state => ({
  batches: state.batches
})
export default connect(mapStateToProps, { fetchBatches, authCheck,push })(Batch)
