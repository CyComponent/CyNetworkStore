CyNetworkStore
===
> The CyNetworkStore provides a shared data model of networks, and a means of downloading new networks into the collection. This CyStore should be used by CyComponents that want to display or manipulate a single network. CyComponents should immediatly reflect changes to networks in this CyStore. Actions allow manipulation of the network in a sequenced manner to avoid corruption.

__CyStore Library Name:__ CyNetworkStore
> ######  Note: A CyStore's library name appears in npm, and is the name used for importing the CyStore as a library.

__CyStore Registered Name:__ cy_network
> ######  Note: The CyStore's registered name appears when it's initialized with the CyFramework in the CyFramework's data model.

__Sample Usage__
> ```javascript
  #Create an instance of the CyFramework using the factory method config, pass in the CyStore dependancy list.
  var cyto = CyFramework.config(CyNetworkStore])
  #Dispatch an action to the CyFramework, in this case, we are adding a sample network called 'my_net'.
  cyto.dispatch(NDExStore.networkActions.addNetwork('my_net', { nodes: [], edges: [] }))
  #Get the state of store 'cy_network'. This is the data model associated with the CyNetworkStore CyStore.
  var state = cyto.store('cy_network')
  #Get back our sample network from the networks store, we use .get() because networks is an immutablejs map.
  console.log(state.networks.get('my_net'))
```

networks
---
> The networks store is an immutablejs map. It is a simple table where etwork identifiers and network data models are keys and values respectively. The store provides only two actions, adding and deleting a network. To edit a network, one simple overwrites the existing data model and immutablejs takes care of only updating the changed portions of the model. Since actions are serialized, changes are made in FIFO order.

__Data model__
> ```javascript
  networks: Map({})
```

### Action Creators

__Registed Name:__ networkActions
> The object under which the action creators are exported. 

#### addNetwork(networkId, data)
> Adds a network to the network table, or overwrites an existing network. 
>
> __Params__
> - networkId: A string, any unique identifier for this network.
> - data: A complex object representing a network.

#### deleteNetwork(networkId)
> Deletes the network from the network table.
>
> __Params__
> - networkId: A string, the unique identifier of the network to be deleted.

networkDownload
---
> The networkDownload store provides actions that can download networks from a url and store the network under that url in the networks store. The data model for this store provides information about the status of a download.

__Data model__
> ```javascript
  lucene: Map({
    downloading: false,
    error: null
  })
```

### Action Creators

__Registed Name:__ serverActions
> The object under which the action creators are exported under. 

#### downloadBegin()
> Sets the downloading flag.

#### downloadSuccess(networkId, data)
> First dispatches to the networks store using addNetwork, then sets downloading to false.
>
> __Params__
> - networkId: A string, any unique identifier for this network.
> - data: A complex object representing a network.

#### download(networkUrl)
> Download performs an HTTP GET operation, with an ACCEPT of application/json. The server must respond with a network represented as json or the download action will fill error with an error object. If the download is successful, the network is added to the networks store with a key of networkUrl. Always concludes with setting downloading to false.
>
> __Params__
> - networkUrl: A full url at which a network repsented as JSON can be aquired via the HTTP GET method.
