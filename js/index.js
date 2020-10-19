import API from '../js/API';

const form = document.getElementById('form');
const search = document.getElementById('search-term');
const article = document.getElementsByTagName('article')[0];

function getResultsFromAPI(e) {
    e.preventDefault();

    const term = search.value;

    term == '' ?
        showMessage('Please add a search term', 'alert') :
        document.getElementsByTagName('header')[0].setAttribute('class', 'slide-out-top') ||
        document.getElementsByTagName('main')[0].setAttribute('class', 'slide-out');

    API.search(term)
        .then(results => {
            // console.log(results);
            let gallery = '<ul class="timeline">';
            results.forEach(result => {
                let date = `${new Date(result.created * 1000).toUTCString()}`;
                gallery += `
                    <li class="timeline-item">
                        <div class="timeline-date">
                            <span>submitted ${date} by &mdash; ${result.author}</span>
                        </div>
                        <div class="timeline-content">
                            <h3 class="timeline-title">${result.title}</h3>
                            <p>
                                ${result.selftext}
                            </p>
                            <a href="https://reddit.com${result.permalink}" target="_blank" rel="noreferrer noopener">${result.num_comments} comments</a>
                        </div>
                    </li>
                `;
            });
            gallery += '</ul>';
            article.innerHTML = gallery;
        });
}

function showMessage(message, className) {
    const main = document.getElementsByTagName('main')[0];
    const section = document.getElementsByTagName('section')[0];
    const div = document.createElement('div');

    div.className = `${className}`;
    div.appendChild(document.createTextNode(message));
    main.insertBefore(div, section);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 1500);
}

form.addEventListener('submit', getResultsFromAPI);