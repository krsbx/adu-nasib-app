import _ from 'lodash';
import axios, { AxiosInstance } from 'axios';
import { AppDispatch } from '.';
import { ResourceName } from '../utils/interfaces';
import { overwriteResource, setResource, updateResource } from './actions/resources';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const applyInterceptors = (dispatch: AppDispatch) => {
  instance.interceptors.request.use(
    (config) => {
      const token = 'getToken()';

      if (config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';

        if (_.isString(config.headers.resourceName))
          config.resourceName = <ResourceName>config.headers.resourceName;

        if (_.isBoolean(config.headers.overwrite)) config.overwrite = config.headers.overwrite;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  instance.interceptors.response.use((res) => {
    const { config, data } = res;

    if (!config.resourceName) return res;

    if (config.overwrite) {
      dispatch(overwriteResource(config.resourceName, data));
    } else if (config.method === 'patch') {
      dispatch(updateResource(config.resourceName, { id: data.id, data }));
    } else {
      dispatch(setResource(config.resourceName, data));
    }

    return res;
  });
};

export default instance;
