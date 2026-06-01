const selectOptions = document.getElementById('scheme-id')
/* Add html with <option> for each receives from API, into innerHTML */

const colorList = document.getElementById('color-list')

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
}

fetch('https://www.thecolorapi.com/id?hex=ffa', options)
    .then(res => res.json())
    .then((data) => {
    console.log(data);
})

