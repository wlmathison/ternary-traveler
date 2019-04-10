const api = {
    getAllInterests() {
        return fetch("http://localhost:8088/interests?_expand=place")
            .then(response => response.json())
    },
    getPlaces() {
        return fetch("http://localhost:8088/places")
            .then(response => response.json())
    }
}

export default api