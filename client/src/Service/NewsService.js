import axiosInstance from './axiosInstance';

const url = 'http://newsapi.org/v2/top-headlines?' +
          'country=eg&' +
          'apiKey='+ process.env.REACT_APP_NEWS_API_KEY;

export default{
    getNewsData : async() => {
        return await axiosInstance.get(url);
    },
    getUserFavorites: async () => {
        return await axiosInstance.get("api/article");
    },
    addToFavorites: async(news) => {
        return await axiosInstance.post("api/article", news);
    },
    removeFromFavorites: async(title) => {
        return await axiosInstance.post("api/article/remove", {title});
    }
    
}