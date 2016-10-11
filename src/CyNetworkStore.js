import networks, * as networkActions from './store/networks'
import networkDownload, * as networkDownloadActions from './store/networkDownload'
import * as networkLoaderActions from './actions/networkLoaderActions'

const storeName = 'cy_network'
const store = {networks, networkDownload}


export {
  storeName,
  store,
  networkActions,
  networkDownloadActions,
  networkLoaderActions
}
