import platform from 'platform';
import axios from 'axios';
import pjson from '../../package.json';
import getIPAddress from '../helpers/get-ip';

export default class UBService {
  constructor({
    apiKey,
    appVersion,
  }) {
    this._client = axios.create({
      baseURL: 'http://localhost:3005/public',
      headers: {
        'Content-Type': 'application/json',
        apiKey,
        os: platform.os,
        osVersion: '',
        browser: platform.name,
        browserVersion: platform.version,
        manufacturer: platform.manufacturer,
        appVersion,
        sdkVersion: pjson.version,
        deviceType: platform.product,
        ipAddress: '',
        // TODO: real device id
        deviceId: "TEST_DEVICE_ID"
      },
    });

    // Once we get the ip address, we add it to all requests as a header
    getIPAddress((ip) => {
      this._client.interceptors.request.use(
        (config) => {
          config.headers['ipAddress'] = 'application/json';
          return ip;
        },
        (error) => {
          Promise.reject(error);
        },
      );
    });
  }

  post({
    path,
    data,
  }) {
    return this._client.post(path, data)
  }

  get({path}) {
    return this._client.get(path)
  }
}