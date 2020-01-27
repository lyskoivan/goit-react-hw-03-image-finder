import axios from 'axios';

const API_KEY = '15026161-e432bf02d9d2367e14c73284c';

async function getImagesByQuery(query, page) {
  const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  try {
    const getImages = await axios.get(URL);

    return getImages.data;
  } catch (error) {
    throw new Error(error);
  }
}

export default { API_KEY, URL, getImagesByQuery };
