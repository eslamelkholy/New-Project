import axiosInstance from './axiosInstance';

export default{
    getNewsData : async() => {
        return await axiosInstance.get('api/getLatestArticles');
    },
    getUserFavorites: async () => {
        return await axiosInstance.get("api/article");
    },
    addToFavorites: async(articleId) => {
        return await axiosInstance.post("api/article", {articleId});
    },
    removeFromFavorites: async(articleId) => {
        return await axiosInstance.post("api/article/remove", {articleId});
    },
    getNewsDetails: async(id) => {
        return await axiosInstance.get(`api/article/${id}`);
    }
    
}