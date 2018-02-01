import { React, Dispatcher, Component, AnyAction } from "reactive-elm"
import { Route, home } from "routes"

// STATE

export interface State {
  route: Route,
  ticks: number
}

export const initialState: State = {
  route: home,
  ticks: 0
}

// UPDATE

export type Action = Tick

export enum ActionType {
  Tick = "Tick"
}

export interface Tick {
  type: ActionType.Tick
}
export const tick: Tick = { type: ActionType.Tick }

export const reactsTo = (action: AnyAction): action is Action => {
  switch (action.type) {
    case ActionType.Tick:
      return true
    default:
      return false
  }
}

export const update = (state: State, action: Action & Dispatcher): State => {
  switch (action.type) {
    case ActionType.Tick:
      return { ...state, ticks: state.ticks + 1 }
  }
}

// VIEW

require("./root.scss")

export class Root extends Component<State> {
  intervalId: NodeJS.Timer

  constructor(state: State & Dispatcher) {
    super(state)
    this.tick = this.tick.bind(this)
  }

  componentWillMount() {
    this.intervalId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  tick() {
    this.dispatch(tick)
  }

  render() {
    return <div>{this.props.ticks}</div>
  }
}

export const view = Root
