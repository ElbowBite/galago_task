import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://galago-task.firebaseio.com/',
});

export default instance;
