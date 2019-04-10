const api = {
    getAllInterests() {
        return fetch("http://localhost:8088/interests?_expand=place")
        .then(response => response.json())
    }
}

export default api