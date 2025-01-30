export const apiUrl = 'http://localhost:8000/api';
// Removed the searchApiUrl as per user request
export const countToken = () => {
    const data = JSON.parse(localStorage.getItem('adminInfo'));
    return data.token;
};
