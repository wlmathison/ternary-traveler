const api = {
    // Fetch call to get and return all intrests
    getAllInterests() {
        return fetch("http://localhost:8088/interests?_expand=place")
            .then(response => response.json())
    },
    // Fetch call to get and return one intrest
    getInterest(interestId) {
        return fetch(`http://localhost:8088/interests/${interestId}`)
            .then(response => response.json())
    },
    // Fetch call to get and return all places
    getPlaces() {
        return fetch("http://localhost:8088/places")
            .then(response => response.json())
    },
    // Fetch call to POST intrest
    postInterest(newInterest) {
        return fetch("http://localhost:8088/interests", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newInterest)
        }).then(results => results.json())
    },
    // Fetch call to PATCH changes into interest
    patchInterest(interestId, changesObject) {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(changesObject)
        })
    },
    // Fetch call to DELETE an interest
    deleteInterest(interestId) {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "DELETE"
        })
    }
}

export default api