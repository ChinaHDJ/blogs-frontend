import RequestApi from '@/lib/RequestApi';
import _ from 'lodash';
import jsonapiNormalize from 'jsonapi-normalizer';

/**
 *----------Dragon be here!----------/
 *   ┏┓      ┏┓
 * ┏┻┻━━━┻┻┓
 * ┃              ┃
 * ┃ ━       ━  ┃
 * ┃  ┳┛ ┗┳   ┃
 * ┃              ┃
 * ┃     ┻       ┃
 * ┃              ┃
 * ┗━┓      ┏━┛
 *     ┃      ┃神兽保佑
 *     ┃      ┃代码无BUG！
 *     ┃      ┗━━━━┓
 *     ┃                ┣┓
 *     ┃                ┣┛
 *     ┗━┓━┏━┓━┏┛
 *         ┃  ┃  ┃  ┃
 *         ┗━┛  ┗━┛
 * ━━━━━━神兽出没━━━━━━by: ChinaHDJ
 */

function setRequestEffect(RequestApi){
  return function *request({ payload }, { call, put }){
    const { normalize = true, append = false, key, url, params, data } = payload;

    return yield call(RequestApi, { url, params, data });
  }
}


export default function createModel(options){
  const { namespace, state = {}, effects = {}, reducers = {} } = options;

  return {
    namespace,
    state,
    effects: {
      get: setRequestEffect(RequestApi.get),
      post: setRequestEffect(RequestApi.post),
      ...effects,
    },
    reducers: {
      normalize(state = {}, { payload }) {
        const {options = {}, response, initialState = {result: {}, entities: {}}} = payload;
        const {append = false, desc = false} = options;

        const {meta = {}, data} = response;
        if (typeof data === 'undefined' || _.isEmpty(data)) {
          if (!append) {
            return {
              ...initialState,
              meta,
            };
          }
        }
        const {result, entities} = jsonapiNormalize(response);

        if (_.isEmpty(result)) {
          if (append) {
            return {
              ...state,
              meta,
            };
          }

          return {
            ...initialState,
            meta,
          };
        }

        if (!append) {
          return {
            ...state,
            result,
            entities,
            meta,
          };
        }

        let position = {first: 0, last: 1};
        if (desc) {
          position = {first: 1, last: 0};
        }

        const nextResult = _.cloneDeep(state.result);
        _.forEach(result, (values, type) => {
          const nextValues = [state.result[type], values];

          nextResult[type] = _.concat([], nextValues[position.first], nextValues[position.last]);
        });

        return {
          ...state,
          result: nextResult,
          entities: _.merge({}, state.entities, entities),
          meta,
        };
      }
    }
  };
};
