const axios = require('axios');
const cheerio = require('cheerio');

const getImageSrc = (url) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      console.log('하이고하이고', $('meta[property="og:image:url"]').attr('content'));
      console.log('하이고하이고', $('meta[property="og:image"]').attr('content'));
    })
    .catch((err) => console.log(err));
};

const link = 'http://item.gmarket.co.kr/Item?goodscode=1864615395&ver=637485727440268035';
getImageSrc(link);
