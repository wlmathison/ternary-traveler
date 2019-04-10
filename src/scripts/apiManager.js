const api = {
    getAllInterests() {
        return fetch("http://localhost:8088/interests?_expand=place")
            .then(response => response.json())
    },
    getPlaces() {
        return fetch("http://localhost:8088/places")
            .then(response => response.json())
    },
    postInterest(newInterest) {
        return fetch("http://localhost:8088/places", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newInterest)
        }).then(results => results.json())
    }
}

export default api