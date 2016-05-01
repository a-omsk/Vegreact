export default (url) => {
    const host = 'https://laravel-joehill.rhcloud.com/api';

    return fetch(host + url);
}