// This gotta be outside of function ()
import getTopicList from './get-topic-list.js';
import getNewsSummary from './get-news-summary.js';

(function () {
    // console.log('user agent=', navigator.userAgent);

    const tabs = document.getElementsByClassName('tab'); // add id="my-button" into html
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener("click", () => openCategory(tabs[i], tabs[i].id));
    }
    openCategory(tabs[0], tabs[0].id);

    function openCategory(event, categoryName) {
        const tabcontent = document.getElementsByClassName("tabcontent");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        const tabs = document.getElementsByClassName("tab");
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].className = tabs[i].className.replace(" active", "");
        }

        const content = document.getElementById(categoryName + "-content");
        content.style.display = "block";
        event.className += " active";

        let ul = document.getElementById(categoryName + 'list');
        if (ul) {
            // ul.innerHTML = '';
            // Keep and reuse Tab Content
            return;
        } else {
            ul = document.createElement('ul');
            ul.id = categoryName + 'list';
            ul.className = 'topiclist';
            content.appendChild(ul);
        }

        let pane = document.getElementById("news-" + categoryName);
        if (pane) {
            pane.innerHTML = '';
        } else {
            pane = document.createElement('div');
            pane.id = 'news-' + categoryName;
            pane.className = 'news';
            content.appendChild(pane);
        }

        getTopicList(categoryName)
            .then(topics => {
                // remove everything - do this again to avoid duplication
                ul.innerHTML = '';
                // let ul = document.getElementById("topiclist-" + categoryName); // grab from outer scope
                for (let topicTitle in topics) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.textContent = topicTitle;
                    a.href = '#';
                    a.newsUrl = topics[topicTitle];
                    a.news = '';
                    a.className = 'topic';
                    // a.onclick = () => openNews(a, pane, newsUrl); // (event hander per <li>)
                    li.appendChild(a);
                    ul.appendChild(li);

                    // PreFetch
                    if (!a.news) {
                        getNewsSummary(a.newsUrl)
                            .then(news => {
                                a.news = news
                            });
                    }
                }
                // add just one listener to <ul> (container of <li>'s)
                ul.addEventListener('click', (e) => {
                    openNews(e, pane);
                });
            });
    }

    function openNews(e, pane) {
        if (!e.target.newsUrl) {
            return; // not our <a> element.
        }
        const a = e.target;
        if (!a.className.includes(' visited')) {
            a.className += ' visited';
        }
        if (a.news) {
            pane.innerHTML = a.news;
            return;
        }

        pane.innerHTML = `<div class="loader"></div> `;
        getNewsSummary(a.newsUrl)
            .then(news => {
                a.news = news;
                pane.innerHTML = news;
            });
    }
})();