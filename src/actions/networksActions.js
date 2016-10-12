import {Map, Set} from 'immutable'


const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const GET_PARAMS = {
  method: 'get',
  headers: HEADERS
}


export const ADD_NETWORK = 'ADD_NETWORK'
export const DELETE_NETWORK = 'DELETE_NETWORK'


export function addNetwork(networkId, data) {
  return {
    type: ADD_NETWORK,
    networkId,
    data
  }
}


export function deleteNetwork(networkId) {
  return {
    type: DELETE_NETWORK,
    networkId
  }
}


export function fetchNetwork(networkId, cxNetworkUrl) {

  console.log("** Source URL:")
  console.log(cxNetworkUrl)

  return dispatch =>

    fetch(cxNetworkUrl, GET_PARAMS)
      .then(response => {
        return response.json() })
      .then(cx => {
        dispatch(addNetwork(networkId, buildNetworkState(cx)))
      })
      .catch(error => { throw error; })
}


function buildNetworkState(cx) {

  return Map({

    network: cx,
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
}


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



export function selectNodes(networkId, nodeIds) {
  return {
    type: SELECT_NODES,
    networkId,
    nodeIds
  }
}

export function deselectNodes(networkId, nodeIds) {
  return {
    type: DESELECT_NODES,
    networkId,
    nodeIds
  }
}

export function selectEdges(networkId, edgeIds) {
  return {
    type: SELECT_EDGES,
    networkId,
    edgeIds
  }
}

export function deselectEdges(networkId, edgeIds) {
  return {
    type: DESELECT_EDGES,
    networkId,
    edgeIds
  }
}

