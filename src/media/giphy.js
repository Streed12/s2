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

const giphyNormalize = ({ data }) => {
  return data.map(result => {
    return {
      id: result.id,
      url: result.images['fixed_height'].url,
      height: result.images['original'].height,
      width: result.images['original'].width
    }
  })
};

const getGiphy = async (searchTerm) => {
  let url = createUrl(GIPHY_URL, {...GIPHY_PARAMS, ...{ q: searchTerm }});

  try {
    let { data } = await axios.get(url);

    if (!data.data.length) {
      throw 'no results'
    } else {
      return {
        word: searchTerm,
        images: giphyNormalize(data)
      }
    }
  } catch (err) {
      return err === 'no results' ? 'no results' : 'network error'    
  }
};

export default getGiphy;
