import axiosInstance from './axiosInstance';

const url = 'http://newsapi.org/v2/top-headlines?' +
          'country=eg&' +
          'apiKey='+ process.env.REACT_APP_NEWS_API_KEY;
const getNewsData = async() => {
    return await axiosInstance.get(url);
}

export default getNewsData;