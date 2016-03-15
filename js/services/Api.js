import { ajax } from 'jquery';
import UserStore from '../stores/UserStore';

const host = 'http://localhost:1337';

const apiCall = (type) => (uri, data = {}) => new Promise((resolve, reject) => {
    const contentType = 'application/json; charset=utf-8';
    const headers = {
        Accept: 'application/json; charset=utf-8',
    };

    if (UserStore.token) {
        headers.access_token = UserStore.token;
    }

    ajax({
        url: `${host}/${uri}`,
        dataType: 'json',
        xhrFields: {
            withCredentials: true,
        },
        data: JSON.stringify(data),
        type,
        headers,
        contentType,
    }).done(result => resolve(result))
      .fail(error => reject(error));
});

const Api = {
    get: apiCall('GET'),
    post: apiCall('POST'),
    put: apiCall('PUT'),
    delete: apiCall('DELETE'),
};

export default Api;
