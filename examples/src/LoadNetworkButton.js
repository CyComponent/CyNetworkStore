import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


import * as networkStore from 'cy-network-store'


class LoadNetworkButton extends Component {


  render() {

    const props = this.props
    const cxUrl = this.url

    return (
      <div>
        <button type='button' onClick={event => this.load(event)}>
          Load CX Network
        </button>
      </div>
    )
  }

}


function mapStateToProps(state) {
  return {
    networks: state.cy_network.networks,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadActions: bindActionCreators(networkStore, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadNetworkButton)

