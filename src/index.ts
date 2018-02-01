import * as Root from "Root"
import { load } from "reactive-elm"
import { Route, toUri, fromUri } from "routes"

load<Root.State, Root.Action, Route>(
  Root.initialState,
  Root.reactsTo,
  Root.update,
  Root.view,
  toUri,
  fromUri,
  module
)
