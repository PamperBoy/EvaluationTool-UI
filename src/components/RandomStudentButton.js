// src/components/games/CreateGameButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'

class RandomStudentButton extends PureComponent {

  render() {
    // if (!this.props.signedIn) return null

    return (
      <div className="RandomStudentButton">
        <RaisedButton
          label="Get random student"
          primary={true}
          fullWidth={true} 
          // onClick={this.props.createGame}
           />
      </div>
    )
  }
}


export default connect()(RandomStudentButton)
