import * as networkActions from './actions/networkActions'
import * as networksActions from './actions/networksActions'
import network from './reducers/network'
import networks from './reducers/networks'

const storeName = 'cy_network'
const reducers = {network, networks}

export {
  storeName,
  reducers,
  networkActions,
  networksActions
}
