import { AppState } from '..';
import { ResourceMap, ResourceName, ResourceStructure } from '../../utils/interfaces';

export const getResources =
  <T extends ResourceName>(resourceName: T) =>
  (state: AppState) =>
    state.resources[resourceName] as ResourceStructure<T>;

export const getResourceById =
  <T extends ResourceName>(resourceName: T, id: number) =>
  (state: AppState) =>
    getResources(resourceName)(state).rows[id] as ResourceMap[T];

export const getResourceTotal =
  <T extends ResourceName>(resourceName: T) =>
  (state: AppState) =>
    getResources(resourceName)(state).count ?? 0;
