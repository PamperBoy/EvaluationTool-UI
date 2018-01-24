// src/containers/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import WatchGameIcon from 'material-ui/svg-icons/image/remove-red-eye'
import JoinGameIcon from 'material-ui/svg-icons/social/person-add'
import PlayGameIcon from 'material-ui/svg-icons/hardware/videogame-asset'
import WaitingIcon from 'material-ui/svg-icons/image/timelapse'
import Divider from 'material-ui/Divider';

// import './Batch.css'

class BatchDetail extends PureComponent {

  render() {
    return (
      <div className="Batch">
        <h1>Batch</h1>
        <Paper className="paper">
          <Menu>

          </Menu>
        </Paper>
      </div>
    )
  }
}


export default connect()(BatchDetail)
