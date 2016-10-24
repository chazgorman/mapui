var Actions = require("./mapui.actions.js");

function executeSearch(data) {
    return {
        type: Actions.EXECUTE_SEARCH,
        data
    }
};

function receiveSearch(search,result) {
    return {
        type: Actions.RECEIVE_SEARCH_RESULTS,
        search: search,
        results: result,
        receivedAt: Date.now()
    }
};

module.exports = {
    updateUser: function(name, value) {
        return {
            type: Actions.USER_LOGIN,
            name: name,
            value: value
        };
    },

    feedUpdate: function(data) {
        return {
            type: Actions.FEED_UPDATE,
            data: data
        };
    },

    aoiUpdate: function(data) {
        return {
            type: Actions.AOI_UPDATE,
            data: data
        };
    },

    centerUpdate: function(data) {
        return {
            type: Actions.CENTER_UPDATE,
            data: data
        }
    },

    setSearch: function(data) {
        return {
            type: Actions.SET_SEARCH,
            data: data
        }
    },

    // Meet our first thunk action creator!
    // Though its insides are different, you would use it just like any other action creator:
    // store.dispatch(fetchPosts('reactjs'))

    fetchSearch: function(search) {

        if(search === ""){
            return function (dispatch){
                dispatch(receiveSearch("", ""))
            }
        }
        // Thunk middleware knows how to handle functions.
        // It passes the dispatch method as an argument to the function,
        // thus making it able to dispatch actions itself.

        return function (dispatch) {

            // First dispatch: the app state is updated to inform
            // that the API call is starting.

            dispatch(executeSearch(search))

            // The function called by the thunk middleware can return a value,
            // that is passed on as the return value of the dispatch method.

            // In this case, we return a promise to wait for.
            // This is not required by thunk middleware, but it is convenient for us.

            var searchBody = {
                placename: search
            };
            return fetch(`http://localhost:8080/geocode`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(searchBody)
                })
                .then(response => response.json())
                .then(json =>

                    // We can dispatch many times!
                    // Here, we update the app state with the results of the API call.

                    dispatch(receiveSearch(search, json))
            )

            // In a real world app, you also want to
            // catch any error in the network call.
        }
    }
};