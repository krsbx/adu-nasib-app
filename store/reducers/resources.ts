import _ from 'lodash';
import { combineReducers } from 'redux';
import { RESOURCE_NAME } from '../../utils/constant';
import { ResourceMap, ResourceName, ResourceStructure } from '../../utils/interfaces';
import { hasOwnProperty } from '../../utils/typeHelper';

const defaultState = {
  rows: {},
  count: 0,
};

export type Payload<K> = {
  id: number;
  data: K | Partial<K>;
};

export type Payloads<T extends ResourceName> = ResourceStructure<T>;

type Action<T extends ResourceName, K extends ResourceMap[T]> = {
  type: string;
  data: Payload<K> | Payloads<T> | number;
};

const reducer =
  <T extends ResourceName, K extends ResourceMap[T]>(resourceName: T) =>
  (state: ResourceStructure<T> = defaultState, action: Action<T, K>) => {
    let temp: ResourceStructure<T> = defaultState;

    switch (action.type) {
      case `resources.${resourceName}.set`:
        if (!hasOwnProperty(action.data, 'rows') || _.isNumber(action.data)) return state;

        // eslint-disable-next-line no-case-declarations
        const data = _.isArray(action.data.rows) ? action.data.rows : [action.data.rows];

        return {
          ...state,
          rows: {
            ...state.rows,
            ..._.keyBy(data, 'id'),
          },
        };

      case `resources.${resourceName}.update`:
        if (hasOwnProperty(action.data, 'rows') || _.isNumber(action.data)) return state;

        return {
          ...state,
          rows: {
            ...state.rows,
            [action.data.id]: {
              ...state.rows[action.data.id],
              ...action.data.data,
            },
          },
        };

      case `resources.${resourceName}.delete`:
        if (!_.isNumber(action.data)) return state;

        temp = _.cloneDeep(state);

        delete temp.rows[action.data];
        return temp;

      case `resources.${resourceName}.overwrite`:
        if (
          !hasOwnProperty(action.data, 'rows') ||
          !hasOwnProperty(action.data, 'count') ||
          _.isNumber(action.data)
        )
          return state;

        // eslint-disable-next-line no-case-declarations
        const data1 = _.isArray(action.data.rows) ? action.data.rows : [action.data.rows];

        return {
          rows: _.keyBy(data1, 'id'),
          count: action.data.count,
        };

      default:
        return state;
    }
  };

const allReducer = _.reduce(
  RESOURCE_NAME,
  (acc, curr) => ({
    ...acc,
    [curr]: reducer(curr),
  }),
  {} as Record<ResourceName, ReturnType<typeof reducer>>
);

export default combineReducers(allReducer);
