/**
 * Actions to fetch data from external data source.
 *
 */

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const GET_PARAMS = {
  method: 'get',
  headers: HEADERS
}

// Initialization
export const RECEIVE_NETWORK = 'RECEIVE_NETWORK'

// Selection
export const SELECT_NODES = 'SELECT_NODES'
export const DESELECT_NODES = 'DESELECT_NODES'
export const SELECT_EDGES = 'SELECT_EDGES'
export const DESELECT_EDGES = 'DESELECT_EDGES'

// View-related action types
export const FIT = 'FIT'

// Addition/deletion
export const ADD_NODES = 'ADD_NODES'
export const ADD_EDGES = 'ADD_EDGES'

export const DELETE_NODES = 'DELETE_NODES'
export const DELETE_EDGES = 'DELETE_EDGES'


export function fetchNetwork(cxNetworkUrl) {

  console.log("Source URL:")
  console.log(cxNetworkUrl)

  return dispatch =>

    fetch(cxNetworkUrl, GET_PARAMS)
      .then(response => {
        return response.json() })
      .then(cx => {
        dispatch(receiveNetwork(cx))
      })
      .catch(error => { throw error; })
}


export function receiveNetwork(cx) {

  console.log('Got CX:')
  console.log(cx)
  return {
    type: RECEIVE_NETWORK,
    cx
  }
}

export function selectNodes(nodeIds) {
  return {
    type: SELECT_NODES,
    nodeIds
  }
}

export function deselectNodes(nodeIds) {
  return {
    type: DESELECT_NODES,
    nodeIds
  }
}

export function selectEdges(edgeIds) {
  return {
    type: SELECT_EDGES,
    edgeIds
  }
}

export function deselectEdges(edgeIds) {
  return {
    type: DESELECT_EDGES,
    edgeIds
  }
}
