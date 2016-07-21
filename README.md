CyNetworkStore
===
> The CyNetworkStore provides a shared data model of networks, and a means of downloading new networks into the collection. This CyStore should be used by CyComponents that want to display or manipulate a single network. CyComponents should immediatly reflect changes to networks in this CyStore. Actions allow manipulation of the network in a sequenced manner to avoid corruption.

__CyStore Library Name:__ CyNetworkStore
> ######  Note: A CyStore's library name appears in npm, and is the name used for importing the CyStore as a library.

__CyStore Registered Name:__ 
> ######  Note: The CyStore's registered name appears when it's initialized with the CyFramework in the CyFramework's data model.

__Sample Usage__
> ```javascript
  #Create an instance of the CyFramework using the factory method config, pass in the CyStore dependancy list.
  var cyto = CyFramework.config([NDExStore])
  #Dispatch an action to the CyFramework, in this case, we are starting a lucene search for 'brc1'
  cyto.dispatch(NDExStore.luceneActions.searchFor('brc1')
  #Get the state of store 'ndex'. This is the data model associated with the NDExStore CyStore.
  var state = cyto.store('ndex')
  #Get the list of networks returned from the lucene search, we use .get() because lucene is an immutablejs map.
  console.log(state.lucene.get('networks'))
```

lucene
---
> The lucene store is an immutablejs map. The lucene store has a flag indicating whether the client is still searching fo networks (for displaying a spinner, etc). It also containers an error that is filled if the search fails, and a list of networks that contain the results of the previous search.

__Data model__
> ```javascript
  lucene: Map({
    searching: false,
    networkSummaries: Set(),
    error: null
  })
```

### Action Creators

__Registed Name:__ luceneActions
> The object under which the action creators are exported under. 

#### searchBegin()
> Sets the searching flag to true, use before beginning a search with searchFor/3

#### searchError(error)
> Called from searchFor/3, not normally used elsewhere, sets the error field with the value of error.
>
> __Params__
> - error: An error object that can be inspected to see the error reason of a failed lucene search.

#### seachFor(server, query, resultSize)
> Begins a lucene search agains the server with a query string, this search will either update networkSummaries or error, depending on the outcome of the search. Either way, it will then flip the searching flag to false.
>
> __Params__
> - server: A string, usually taken from the server store to reflect the store's choice of server.
> - query: A string, the lucene query to search against NDEx. 
> - resultSize(OPTIONAL): Default of 50, setting this to a high value will incease the searchTime. This is the max number of results returned by the lucene search.

server
---
> The server store is an immutable map. It containers information about the NDEx server to be used, the username and password, and the log in state of the user. If loggedIn is false, th userName and userPass fields are considered garbage. Actions allow setting the server name and address, and logging the user in and out.

__Data model__
> ```javascript
  lucene: Map({
    serverName: "Public NDEx",
    serverAddress: "http://public.ndexbio.org",
    userName: "",
    userPass: "",
    loggedIn: false
  })
```

### Action Creators

__Registed Name:__ serverActions
> The object under which the action creators are exported under. 

#### setServer(name, address)
> Set the server name and address.
>
> __Params__
> - name: A string, a human readable identifier for the server.
> - address: The url of the NDEx server.

#### login(name, pass)
> Sets loggedIn to true, and adds the users credentials (unencrypted).
>
> __Params__
> - name: The user's NDEx username
> - pass: The user's NDEx password 

#### logout()
> Sets the loggedIn flag to false.
