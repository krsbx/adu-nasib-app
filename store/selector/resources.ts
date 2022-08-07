import { AppState } from '..';
import { ResourceName } from '../../utils/interfaces';

export const getResources =
  <T extends ResourceName>(resourceName: T) =>
  (state: AppState) =>
    state.resources[resourceName];

export const getResourceById =
  <T extends ResourceName>(resourceName: T, id: number) =>
  (state: AppState) =>
    getResources(resourceName)(state).rows[id];

export const getResourceTotal =
  <T extends ResourceName>(resourceName: T) =>
  (state: AppState) =>
    getResources(resourceName)(state).count ?? 0;
