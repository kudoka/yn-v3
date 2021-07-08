const express = require('express')
const path = require('path')
const { createProxyMiddleware } = require('http-proxy-middleware');
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'static')))
    .set('views', path.join(__dirname, 'view'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('page/index'))
    .use('/rss/topics', createProxyMiddleware({
        target: 'https://news.yahoo.co.jp',
        changeOrigin: true
    }))
    .use('/pickup', createProxyMiddleware({
        target: 'https://news.yahoo.co.jp',
        changeOrigin: true,
    }))
    .use('/articles', createProxyMiddleware({
        target: 'https://news.yahoo.co.jp',
        changeOrigin: true,
    }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
