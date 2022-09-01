import { AppDispatch } from '..';
import { LikeDislike, ResourceMap, ResourceName } from '../../utils/interfaces';
import axios from '../axios';
import { Payload, Payloads } from '../reducers/resources';

export const setResource = <T extends ResourceName>(
  resourceName: T,
  data: Payload<ResourceMap[T]>
) => ({
  type: `resources.${resourceName}.set`,
  data,
});

export const updateResource = <T extends ResourceName>(
  resourceName: T,
  data: Payload<ResourceMap[T]>
) => ({
  type: `resources.${resourceName}.update`,
  data, // { id, data }
});

export const overwriteResource = <T extends ResourceName>(resourceName: T, data: Payloads<T>) => ({
  type: `resources.${resourceName}.overwrite`,
  data,
});

export const deleteResource = <T extends ResourceName>(resourceName: T, data: number) => ({
  type: `resources.${resourceName}.delete`,
  data, // id
});

export const getAllData =
  <T extends ResourceName>(resourceName: T, query = '', overwrite = true) =>
  async () => {
    const { data } = await axios.get<ResourceMap[T][]>(`/${resourceName}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });

    return data;
  };

export const getDataById =
  <T extends ResourceName>(resourceName: T, id: number | string, query = '', overwrite = false) =>
  async () => {
    const { data } = await axios.get<ResourceMap[T]>(`/${resourceName}/${id}?${query}`, {
      headers: {
        resourceName,
        overwrite,
      },
    });

    return data;
  };

export const addData =
  <T extends ResourceName>(resourceName: T, payload: unknown) =>
  async (dispatch: AppDispatch) => {
    const { data } = await axios.post<ResourceMap[T]>(`/${resourceName}`, payload, {
      headers: {
        resourceName,
      },
    });

    dispatch(
      updateResource(resourceName, {
        id: data.id,
        data,
      })
    );

    return data;
  };

export const updateData =
  <T extends ResourceName>(resourceName: T) =>
  (id: number, update: unknown, query = '') =>
  async () => {
    const { data } = await axios.patch<ResourceMap[T]>(`/${resourceName}/${id}?${query}`, update, {
      headers: {
        resourceName,
      },
    });

    return data;
  };

export const deleteData =
  <T extends ResourceName>(resourceName: T, id: number) =>
  async (dispatch: AppDispatch) => {
    await axios.delete(`/${resourceName}/${id}`);

    dispatch(deleteResource(resourceName, id));
  };

export const likeResource =
  <T extends Extract<ResourceName, 'posts' | 'comments'>>(resourceName: T, id: number) =>
  async (dispatch: AppDispatch) => {
    const { data } = await axios.post<LikeDislike>(`/${resourceName}/${id}/like`);

    dispatch(
      updateResource(resourceName, {
        id,
        data: data as Partial<ResourceMap[T]>,
      })
    );

    return data;
  };

export const dislikeResource =
  <T extends Extract<ResourceName, 'posts' | 'comments'>>(resourceName: T, id: number) =>
  async (dispatch: AppDispatch) => {
    const { data } = await axios.post<LikeDislike>(`/${resourceName}/${id}/dislike`);

    dispatch(
      updateResource(resourceName, {
        id,
        data: data as Partial<ResourceMap[T]>,
      })
    );

    return data;
  };
