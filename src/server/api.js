import axios from "axios";

const BASE_URL = 'https://recycletradezone.com/rcbackend/api';

export default axios.create({
    baseURL: BASE_URL
});