import {Map, Set} from 'immutable'
import * as actions from '../actions/networksActions'


// Def state is just an empty map of networks
const DEF_STATE = Map({})


export default function networks(state = DEF_STATE, action) {

  const curNetwork = state.get(action.networkId)



  console.log('####### curNetwork is:')
  console.log(curNetwork)

  switch (action.type) {
    case actions.ADD_NETWORK:
      return state.set(action.networkId, Map(action.data))
    case actions.DELETE_NETWORK:
      return state.delete(action.networkId)

    case actions.SELECT_NODES:
    case actions.DESELECT_NODES:
      let selectedNodes = curNetwork.get('selected').get('nodes')
      if(action.type === actions.SELECT_NODES) {
        selectedNodes = selectedNodes.union(Set(action.nodeIds))
      } else {
        selectedNodes = selectedNodes.subtract(Set(action.nodeIds))
      }
      return state.setIn([action.networkId, 'selected', 'nodes'], selectedNodes)

    case actions.SELECT_EDGES:
    case actions.DESELECT_EDGES:
      let selectedEdges = curNetwork.get('selected').get('edges')
      if(action.type === actions.SELECT_EDGES) {
        selectedEdges = selectedEdges.union(Set(action.edgeIds))
      } else {
        selectedEdges = selectedEdges.subtract(Set(action.edgeIds))
      }
      return state.setIn([action.networkId, 'selected', 'edges'], selectedEdges)

    default:
      return state
  }
}
