import {Map, Set} from 'immutable'
import * as actions from '../actions/networksActions'


const DEF_STATE = Map({
})


export default function networks(state = DEF_STATE, action) {

  const curNetwork = state.get(action.networkId)

  console.log("CURNET-0------------------")
  if(curNetwork !== undefined) {
    console.log(action.networkId)
    console.log(curNetwork.toJS())

  }
  console.log(state)
  console.log("------------------")


  switch (action.type) {
    case actions.ADD_NETWORK:
      return state.set(action.networkId, Map(action.data))
    case actions.DELETE_NETWORK:
      return state.delete(action.networkId)

    case actions.SELECT_NODES:
      console.log('!! SEL')
      const selectedObj = curNetwork.get('selected')
      const selected = selectedObj.nodes.union(Set(action.nodeIds))
      curNetwork.get('selected').nodes = selected
      return state
    // case actions.SELECT_EDGES:
    //   const selectedEdges = state.get('selected').edges.union(Set(action.edgeIds))
    //   state.get('selected').edges = selectedEdges
    //   return state
    //
    // case actions.DESELECT_NODES:
    //   const deselected = state.get('selected').nodes.subtract(Set(action.nodeIds))
    //   state.get('selected').nodes = deselected
    //   return state
    //
    // case actions.DESELECT_EDGES:
    //   const deselectedEdges = state.get('selected').edges.subtract(Set(action.edgeIds))
    //   state.get('selected').edges = deselectedEdges
    //   return state
    default:
      return state
  }
}
