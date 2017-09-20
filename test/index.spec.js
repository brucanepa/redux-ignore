import assert from 'assert'
import { createStore } from 'redux'

import { createReducerByIgnoringActions, createReducerByFilteringActions } from '../src/index'

let reducer = (state, action) => {
  switch (action.type) {
    case 'FOO':
      return 'foo-state'
    case 'BAR':
      return 'bar-state'
    default:
      return 'default-state'
  }
}

describe('createReducerByIgnoringActions()', () => {
  it('should ignore actions with specified types in array', () => {
    let ignoringReducer = createReducerByIgnoringActions(reducer, {'BAR': true})
    let action = { type: 'BAR' }

    assert.equal(
      ignoringReducer('testing', action),
      'testing')
  })

  it('should not ignore actions that do not have types in array', () => {
    let ignoringReducer = createReducerByIgnoringActions(reducer, {'BAR': true})
    let action = { type: 'FOO' }

    assert.equal(
      ignoringReducer('testing', action),
      'foo-state')
  })

  it('should allow all actions when no action types array is specified', () => {
    let ignoringReducer = createReducerByIgnoringActions(reducer)
    let action = { type: 'BAZ' }

    assert.equal(
      ignoringReducer('testing', action),
      'default-state')
  })
})

describe('createReducerByFilteringActions()', () => {
  it('should include actions with specified types in array', () => {
    let filteringReducer = createReducerByFilteringActions(reducer, {'BAR': true})
    let action = { type: 'BAR' }

    assert.equal(
      filteringReducer('testing', action),
      'bar-state')
  })

  it('should exclude actions that do not have types in array', () => {
    let filteringReducer = createReducerByFilteringActions(reducer, {'BAR': true})
    let action = { type: 'FOO' }

    assert.equal(
      filteringReducer('testing', action),
      'testing')
  })

  it('should exclude all actions when no action types array is specified', () => {
    let filteringReducer = createReducerByFilteringActions(reducer)
    let action = { type: 'BAZ' }

    assert.equal(
      filteringReducer('testing', action),
      'testing')
  })

  it('should return an initial state when a redux store is created', () => {
    let filteringReducer = createReducerByFilteringActions(reducer, {'BAR': true})
    let store = createStore(filteringReducer)

    assert.equal(
      store.getState(),
      reducer(undefined, {}))
  })
})
