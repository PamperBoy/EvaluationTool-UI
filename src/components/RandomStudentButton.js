// src/components/games/CreateGameButton.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'

class RandomStudentButton extends PureComponent {

  render() {

    return (
      <div className="RandomStudentButton">
        <RaisedButton
          label="Get random student"
          primary={false}
          fullWidth={true}
          onClick={this.props.onClick}
           />
      </div>
    )
  }
}


export default connect()(RandomStudentButton)
