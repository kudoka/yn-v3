// jquery is loaded by <script>

export default async function (category) {
    return fetch('rss/topics/' + category + '.xml')
        .then(res => res.text())
        .then(rssXml => parseRssXml(rssXml));
}

function parseRssXml(rssXml) {
    const topics = {};
    const $body = $($.parseXML(rssXml));
    $body.find('item').each((i, element) => {
        const $elem = $(element);
        const topicTitle = $elem.find('title').text();
        const topicUrl = $elem.find('link').text().replace(/.*yahoo.co.jp\//, '');
        topics[topicTitle] = topicUrl;
    });
    return topics;
}
