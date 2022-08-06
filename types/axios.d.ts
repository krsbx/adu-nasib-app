import {
  AxiosRequestHeaders as OriginalAxiosRequestHeaders,
  AxiosRequestConfig as OriginalAxiosRequestConfig,
} from 'axios';
import { ResourceName } from '../utils/interfaces';

declare module 'axios' {
  interface AxiosRequestHeaders extends OriginalAxiosRequestHeaders {
    Authorization: string;
    resourceName: ResourceName;
    overwrite: boolean;
  }

  interface AxiosInstance {
    config?: {
      headers?: AxiosRequestHeaders;
    };
  }

  interface AxiosRequestConfig extends OriginalAxiosRequestConfig {
    headers?: AxiosRequestHeaders;
    resourceName?: ResourceName;
    overwrite?: boolean;
  }
}
