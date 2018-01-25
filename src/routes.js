// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  Batch,
  SignIn,
  SignUp,
  BatchDetail
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Batch} />

        <Route path="/batch/:batchId" component={BatchDetail} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
