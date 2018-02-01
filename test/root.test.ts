require("jsdom-global")()
const test = it
import { expect } from "chai"
import { withDispatch } from "reactive-elm"
import { update as update$, State, initialState, Action, tick } from "Root"
const update = withDispatch<State, Action>(update$)

describe("Root", () => {
  test("tick", () => {
    let state = { ...initialState, ticks: 0 }

    state = update(state, tick)
    expect(state.ticks).to.eq(1)

    state = update(state, tick)
    expect(state.ticks).to.eq(2)

    state = update(state, tick)
    expect(state.ticks).to.eq(3)
  })
})
