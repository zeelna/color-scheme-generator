/*
Application implements API: https://www.thecolorapi.com/docs#schemes-generate-scheme-get
 */

const form = document.getElementById('form');
callAPI(); // render before user's selection to create HTML layout

form.addEventListener('submit', (e) => {
    e.preventDefault();
    callAPI();
    // form.reset(); /* Avoid this, resets <input type="color" to default color value in DOM */
})

function callAPI(){
    const {colorSchemeMode, seedColor, count } = getQueryStrings(form)

    const endpoint = '/scheme';
    const queryString = `?hex=${seedColor}&mode=${colorSchemeMode}&count=${count}`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    fetch(`https://www.thecolorapi.com${endpoint}${queryString}`, options)
        .then(res => res.json())
        .then((data) => {
            renderHTML(data);
        })
}

function getQueryStrings(formHTML) {
    const formData = new FormData(formHTML);
    const colorSchemeMode = formData.get('scheme');

    /* Remove # before HEX (example #000000 -> 000000) */
    const seedColor = formData.get('seed').slice(1,);
    /* Determine the amount of colors from API based on Color Scheme */
    const counts = {
        'complement': 2,
        'triad': 3,
        'monochrome-light': 3,
        'quad': 4,
        // omit default - handle with nullish coalescing
    }
    const count = counts[colorSchemeMode] ?? 5; // nullish coalescing

    return  { seedColor, colorSchemeMode, count, };
}

function renderHTML(data) {
    const hexTitles = data.colors.map(item => item.hex.value);
    console.log(hexTitles);

    const colorsHTML = hexTitles.map(hexColor => `
        <div class="item-div">
            <div class="color-panel" style="background-color: ${hexColor}"></div>
            <div class="color-hex">${hexColor}</div>
        </div>
        `
    ).join('');

    const colorSection = document.getElementById('section-colors')
    colorSection.innerHTML =
        `<div id="color-list" className="color-list" style="display:grid; grid-template-columns: repeat(${data.colors.length}, 1fr);">
            ${colorsHTML}
        </div>`
    /* return */
}
