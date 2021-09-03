import axios from 'axios';
import { ACCESSTOKEN, DOMAIN, DOMAINALTER } from '../../util/setting';

export class baseService {
    constructor() {}

    get = (url) => {
        let promise = axios({
            url: `${DOMAIN}${url}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer  ${localStorage.getItem(ACCESSTOKEN)}`,
            },
        });
        return promise;
    };

    post = (url, info) => {
        let promise = axios({
            url: `${DOMAIN}${url}`,
            method: 'POST',
            data: info,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESSTOKEN)}`,
            },
        });
        return promise;
    };

    postalter = (url, info) => {
        let promise = axios({
            url: `${DOMAINALTER}${url}`,
            method: 'POST',
            data: info,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESSTOKEN)}`,
            },
        });
        return promise;
    };
    put = (url, info) => {
        let promise = axios({
            url: `${DOMAIN}${url}`,
            method: 'PUT',
            data: info,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem(ACCESSTOKEN),
            },
        });
        return promise;
    };
    delete = (url) => {
        let promise = axios({
            url: `${DOMAIN}${url}`,
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem(ACCESSTOKEN),
            },
        });
        return promise;
    };
}
