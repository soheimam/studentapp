const searchBar = document.getElementById('searchBar')

$("document").ready(() => {
    $.get("http://localhost:3000/usersjson", (data) => {
        let keys = ""
        searchBar.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace'){
                keys = keys.substring(0, keys.length - 1); 
            } else {
                keys = keys + e.key
            }
            const output = data.filter(data => data.firstname.includes(keys))
            if (output.length === 1){
                //stops users from continuing to write in the search bar
                document.activeElement.blur();
                // we have an array of items in output
                searchBar.value = output.map(name => name.firstname)
            }
        })
    });
});


