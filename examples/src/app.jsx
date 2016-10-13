import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {bindActionCreators, createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'
import CyNetworkViewer from 'cy-network-viewer'
import thunk from 'redux-thunk'
import {networkActions, networksActions, reducers} from 'cy-network-store'
import {stylesActions} from 'cy-style-store'
import {reducers as styleReducer} from 'cy-style-store'


/**
 *
 * This is a simple example to build application using
 * Network Viewer and its Store.
 *
 */


// Base style for the application window
const style = {
  height: '100%',
  width: '100%'
}

// 1. Create store from reducers
const create = window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(create)

const networks = reducers.networks
const styles = styleReducer.styles
const combined = combineReducers({networks, styles})
const store = createStoreWithMiddleware(combined)


// 2. Connect them to Redux
const mapStateToProps = state => {
  return {
    networks: state.networks,
    styles: state.styles,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    networkActions: bindActionCreators(networkActions, dispatch),
    networksActions: bindActionCreators(networksActions, dispatch),
    stylesActions: bindActionCreators(stylesActions, dispatch)
  };
}



// Base App
class NetworkViewer extends Component {

  handleClick(evt) {

    // Load two networks
    this.props.networksActions.fetchNetwork('network1', './sample.json')
    this.props.networksActions.fetchNetwork('network2', './sample.json')
  }

  handleSelect(evt) {
    this.props.networkActions.selectNodes([1, 2, 3, 4, 5])
  }

  handleDeselect(evt) {
    this.props.networkActions.deselectNodes([2, 5])
  }



  componentWillReceiveProps(nextProps) {
    console.log("----------------NEW prop");
    console.log(nextProps);
    const n1 = nextProps.networks.get('network1')
    console.log(n1.get('network').toJS())

  }

  render() {

    console.log("%%%%%%% App renderer called");
    console.log(this.props);

    let net1 = this.props.networks.get('network1')
    let net2 = this.props.networks.get('network2')

    if(net1 === null || net1 === undefined) {
      net1 = null
    } else {
      net1 = net1.get('network').toJS()
    }

    if(net2 === null || net2 === undefined) {
      net2 = null
    } else {
      net2 = net2.get('network').toJS()
    }
    console.log(net1);
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


// Initialize App
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
