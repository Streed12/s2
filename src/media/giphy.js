import axios from 'axios';

const GIPHY_URL = 'http://api.giphy.com/v1/gifs/search?';

let GIPHY_PARAMS = {
  api_key: 'dc6zaTOxFJmzC',  //public key
  q: 'replace with search term',
  limit: '25'   //by default
};

const createUrl = (url, params) => {

  let paramsSerialized = Object.entries(params).map(pair => {
    return `${pair[0]}=${pair[1].split(' ').join('+')}`;
  }).join('&')

  return `${url}${paramsSerialized}`;
};

const giphyNormalize = (results) => {
  return results.data.data.map(result => {
    return result.images['fixed_height_small'].url;
  })
};

const getGiphy = async (searchTerm) => {
  let url = createUrl(GIPHY_URL, {...GIPHY_PARAMS, ...{ q: searchTerm }});
  return axios.get(url)
    .then(results => {
      if (!results.data.data.length) {
        throw 'no results'
      } else {
        return {
          word: searchTerm,
          images: giphyNormalize(results)
        }
      }
    })
    .catch(err => {
      console.log('err', err)
      return err === 'no results' ? 'no results' : 'network error'
    });
};

export default getGiphy;
