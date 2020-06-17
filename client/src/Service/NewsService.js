import axiosInstance from './axiosInstance';

const url = 'api/getLatestArticles';

export default{
    getNewsData : async() => {
        return await axiosInstance.get(url);
    },
    getUserFavorites: async () => {
        return await axiosInstance.get("api/article");
    },
    addToFavorites: async(articleId) => {
        return await axiosInstance.post("api/article", {articleId});
    },
    removeFromFavorites: async(articleId) => {
        return await axiosInstance.post("api/article/remove", {articleId});
    }
    
}