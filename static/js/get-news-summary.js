export default async function (newsSummaryUrl) {
    console.log('News summary URL', newsSummaryUrl);

    return fetch(newsSummaryUrl, {
        headers: myHeaders
    })
        .then(res => res.text())
        .then(newsSummaryBody => {
            const $body = $(newsSummaryBody);
            const article = $body.find('#contentsWrap > article');
            $(article.children()[1]).find('ul').remove(); // remove Twitter/Facebook
            while (article.children()[2]) {
                article.children()[2].remove(); // drop extra elements - ここがポイント etc.

            }
            return article.html();
        })
}

const myHeaders = new Headers({
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
    "Accept": "application/json",
});
