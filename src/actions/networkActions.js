export const SET_ID = 'SET_ID'


export function setId(networkId) {
  return {
    type: SET_ID,
    networkId
  }
}
