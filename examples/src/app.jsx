import {Map, Set} from 'immutable'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {bindActionCreators, createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'
import CyNetworkViewer from 'cy-network-viewer'
import thunk from 'redux-thunk'
import {networkActions, networksActions, reducers} from 'cy-network-store'


/**
 *
 * This is a simple example to build application using
 * Network Viewer and its Store.
 *
 */


// Empty network
const EMPTY_NETWORK = {
  data: {
    name: 'empty network'
  },
  elements: {
    nodes: [],
    edges: []
  }
}

const defaultState = Map({
  network: EMPTY_NETWORK,
})

const networkUrl = 'https://raw.githubusercontent.com/cytoscape/json/master/src/test/resources/testData/galFiltered.json'


// Create store from reducer
const create = window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(create)


const store = createStoreWithMiddleware(reducers.networks);


const mapStateToProps = state => {
  console.log('* Map State:')
  console.log(state)

  return {
    networks: state,
    // network: state.get('network'),
    // selected: state.get('selected'),
    // view: state.get('view')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    networkActions: bindActionCreators(networkActions, dispatch),
    networksActions: bindActionCreators(networksActions, dispatch)
  };
}


// Base App
class NetworkViewer extends Component {

  handleClick(evt) {
    console.log(networksActions)
    this.props.networksActions.fetchNetwork('network1', './sample.json')
    this.props.networksActions.fetchNetwork('network2', './sample.json')
  }

  handleSelect(evt) {
    this.props.networkActions.selectNodes([1, 2, 3, 4, 5])
  }

  handleDeselect(evt) {
    this.props.networkActions.deselectNodes([2, 5])
  }


  render() {

    const style = {
      height: '100%',
      width: '100%'
    }


    console.log("%%%%%%% Rendering");
    console.log(this.props);

    let net1 = this.props.networks.get('network1')
    let net2 = this.props.networks.get('network2')

    if(net1 === undefined || net1 === null || net1 === {}) {
      net1 = EMPTY_NETWORK
    } else {
      net1 = net1.toJS().network

    }

    if(net2 === undefined || net2 === null || net2 === {}) {
      net2 = EMPTY_NETWORK
    } else {
      net2 = net2.toJS().network

    }

    console.log('********* net1')
    console.log(net1);
    console.log('********* net2')
    console.log(net2);

    return (
      <div style={style}>

        <div>
          <button type='button' onClick={event => this.handleClick(event)}>
            Load CX Network
          </button>
          <button type='button' onClick={event => this.handleSelect(event)}>
            Select Nodes
          </button>
          <button type='button' onClick={event => this.handleDeselect(event)}>
            Deselect Nodes
          </button>
        </div>

        <h2>Renderer 1</h2>
        <CyNetworkViewer
          id='Rend1'
          renderer='cytoscape'
          networkId='network1'
          network={net1}
          eventHandlers={this.props.networksActions}
        />

        <h2>Renderer 2</h2>
        <CyNetworkViewer
          id='Rend2'
          renderer='cytoscape'
          networkId='network2'
          network={net2}
          eventHandlers={this.props.networksActions}
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
