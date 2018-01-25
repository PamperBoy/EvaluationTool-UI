// src/routes.js
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  Batch,
  SignIn,
  SignUp,
  BatchDetail,
  StudentDetail,
} from './containers'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Batch} />

        <Route exact={true} path="/batch/:batchId" component={BatchDetail} />
        <Route path="/batch/:batchId/student/:studentId" component={StudentDetail} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </div>
    )
  }
}
