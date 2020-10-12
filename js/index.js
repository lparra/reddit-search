import API from '../js/API';

const form = document.getElementById('search-form');
const input = document.getElementById('search-term');
const output = document.getElementById('conclusion');

function submit(e) {
    const term = input.value;

    term == '' ?
        showMessage('Please add a search term', 'alert') :
        document.getElementsByTagName('header')[0].setAttribute('class', 'slide-out-top') ||
        document.getElementsByTagName('main')[0].setAttribute('class', 'slide-out');

    e.preventDefault();

    API.search(term)
        .then(conclusion => {
            console.log(conclusion);
            let gallery = '<ul class="timeline">';
            conclusion.forEach(post => {
                let date = `${new Date(post.created * 1000).toUTCString()}`;
                gallery += `
                    <li class="timeline-item">
                        <div class="timeline-date">
                            <span>submitted ${date} by &mdash; ${post.author}</span>
                        </div>
                        <div class="timeline-content">
                            <h3 class="timeline-title">${post.title}</h3>
                            <p>
                                ${post.selftext}
                            </p>
                            <a href="https://reddit.com${post.permalink}" target="_blank" rel="noreferrer noopener">${post.num_comments} comments</a>
                        </div>
                    </li>
                `;
            });
            gallery += '</ul>';
            output.innerHTML = gallery;
        });
}

function showMessage(message, className) {
    const div = document.createElement('div');
    const main = document.getElementById('main');
    const initiation = document.getElementById('initiation');

    div.className = `${className}`;
    div.appendChild(document.createTextNode(message));
    main.insertBefore(div, initiation);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 1500);
}

form.addEventListener('submit', submit);