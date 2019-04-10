const api = {
    getAllInterests() {
        return fetch("http://localhost:8088/interests?_expand=place")
            .then(response => response.json())
    },
    getInterest(interestId) {
        return fetch(`http://localhost:8088/interests/${interestId}`)
            .then(response => response.json())
    },
    getPlaces() {
        return fetch("http://localhost:8088/places")
            .then(response => response.json())
    },
    postInterest(newInterest) {
        return fetch("http://localhost:8088/interests", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newInterest)
        }).then(results => results.json())
    },
    patchInterest(interestId, changesObject) {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(changesObject)
        })
    },
    deleteInterest(interestId) {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "DELETE"
        })
    }
}

export default api