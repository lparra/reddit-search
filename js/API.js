export default { 
    search: function(term) {
        return fetch(`https://www.reddit.com/search.json?q=${term}&sort=relevant&limit=25`)
            .then(response => response.json())
            .then(data => data.data.children.map(x => x.data))
            .catch(error => console.error(error));
    }
}