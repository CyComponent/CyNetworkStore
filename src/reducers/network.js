import {Map, Set} from 'immutable'
import * as actions from '../actions/networkActions'


const DEF_STATE = Map({

  network: null,
  selected: {
    nodes: Set([]),
    edges: Set([])
  },
  view: {
    zoom: 1.0,
    pan: {
      x: 0,
      y: 0
    },
    style: {}
  }
})


export default function network(state = DEF_STATE, action) {

  console.log(state);
  console.log(action);

  switch (action.type) {
    case actions.RECEIVE_NETWORK:
      return state.merge({
        network: action.cx,
      })

    case actions.SELECT_NODES:
      const selected = state.get('selected').nodes.union(Set(action.nodeIds))
      state.get('selected').nodes = selected
      return state
    case actions.SELECT_EDGES:
      const selectedEdges = state.get('selected').edges.union(Set(action.edgeIds))
      state.get('selected').edges = selectedEdges
      return state

    case actions.DESELECT_NODES:
      const deselected = state.get('selected').nodes.subtract(Set(action.nodeIds))
      state.get('selected').nodes = deselected
      return state

    case actions.DESELECT_EDGES:
      const deselectedEdges = state.get('selected').edges.subtract(Set(action.edgeIds))
      state.get('selected').edges = deselectedEdges
      return state
    default:
      return state
  }
}
