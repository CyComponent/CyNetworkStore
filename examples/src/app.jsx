import {Map} from 'immutable'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {bindActionCreators, createStore, applyMiddleware} from 'redux'
import {Provider, connect} from 'react-redux'

import CyNetworkViewer from 'cy-network-viewer'

import {networkLoaderActions} from 'cy-network-store'
import thunk from 'redux-thunk'

// Sample Redux application using viewer and store

const defNetwork = Map({
  data: {
    name: 'empty1'
  },
  elements: {
    nodes: [{data: {id: 'node1'}}],
    edges: []
  }
})

const defaultState = Map({
  network: defNetwork,
  error: null
})

const networkUrl = 'https://raw.githubusercontent.com/cytoscape/json/master/src/test/resources/testData/galFiltered.json'


// Store
function singleNetworkStore(state = defaultState, action) {


  console.log('============ Store ==========');
  console.log(state);
  console.log(action);


  switch (action.type) {
    case 'RECEIVE_NETWORK':
      const newState = state.merge({
        network: action.cx,
        error: null
      })


      console.log('newState:');
      console.log(newState);

      return newState
    default:
      return state
  }
}

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

const store = createStoreWithMiddleware(singleNetworkStore, defaultState);


function mapStateToProps(state) {
  console.log('!!!!!!!!mapping!!!!!!!!!!!!')
  console.log(state.get('network'))
  return {
    network: state.get('network')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadNetwork: bindActionCreators(networkLoaderActions, dispatch)

  };
}


// Base App
class NetworkViewer extends Component {

  handleClick(evt) {
    console.log(this.props.loadNetwork)
    this.props.loadNetwork.fetchNetwork('./sample.json')
  }


  render() {

    const style = {
      height: '100%',
      width: '100%'
    }
    const net = this.props.network.toJS()

    console.log(this.props);
    console.log("%%%%%%% Rendering");
    console.log(net);

    return (
      <div style={style}>

        <button type='button' onClick={event => this.handleClick(event)}>
          Load CX Network
        </button>

        <CyNetworkViewer
          id='Rend1'
          renderer='cytoscape'
          network={net}
        />
      </div>
    )
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkViewer);



// Render it.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('viewer')
);
