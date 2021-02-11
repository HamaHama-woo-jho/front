const axios = require('axios');
const cheerio = require('cheerio');

const getImageSrc = (url) => {
  axios.get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      if ($('meta[property="og:image:url"]').attr('content') === undefined) {
        console.log($('meta[property="og:image"]').attr('content'));
        return $('meta[property="og:image"]').attr('content');
      } else {
        console.log($('meta[property="og:image:url"]').attr('content'));
        return $('meta[property="og:image:url"]').attr('content');
      }
    })
    .catch((err) => console.log(err));
};

// const url = 'http://item.gmarket.co.kr/Item?goodscode=995511248';
// const a = getImageSrc(url);

export default getImageSrc;
