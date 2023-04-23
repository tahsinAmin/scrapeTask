const cheerio = require('cheerio');

const html = `
<body>

 <script type="text/javascript"src="/data/common.0e95a19724a68c79df7b.js"></script>
 <script id="__NEXT_DATA__" type="application/json" nonce="sYTjB9W5Rq8QuvWFFWobxQ==">{"org": 10, "items":["one","two"]}</script>
</body>
`;

const $ = cheerio.load(html);
let jsonData = JSON.parse($("script#__NEXT_DATA__").text())

console.log(jsonData);