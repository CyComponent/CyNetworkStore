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

const RECEIVE_NETWORK = 'RECEIVE_NETWORK'


export function fetchNetwork(cxNetworkUrl) {

  console.log("Source URL:")
  console.log(cxNetworkUrl)

  return dispatch =>

    fetch(cxNetworkUrl, GET_PARAMS)
      .then(response => {

        console.log(response)
        return response.json() })
      .then(cx => {
        console.log(cx);
        dispatch(receiveNetwork(cx))
      })
      .catch(error => {

        console.log(error);

        throw error; })
}


export function receiveNetwork(cx) {

  console.log('Got CX:')
  console.log(cx)
  return {
    type: RECEIVE_NETWORK,
    cx
  }
}