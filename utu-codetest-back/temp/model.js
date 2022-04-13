import modelExtend from 'dva-model-extend'
const { pathToRegexp } = require('path-to-regexp')
import api from 'api'
import { pageModel } from 'utils/model'

const { queryUserList, queryUser, queryUserFilter } = api

export default modelExtend(pageModel, {
  namespace: 'users',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    loading: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (pathToRegexp('/users/userlist').exec(location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      try {
        const { data } = yield call(queryUserList, payload)
        if (data) {
          console.log('users data:',data)
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: {
                current: Number(payload.page) || 1,
                pageSize: Number(payload.pageSize) || 10,
                total: data.total,
              },
            },
          })
        }
      } catch (e) {
        console.log(e)
      }
    },

    *queryByCode({ payload }, { call, put }) {
      try {
        const { success, data } = yield call(queryUser, payload)
        if (success) {
          let dataList = []
          dataList.push(data)
          yield put({
            type: 'querySuccess',
            payload: {
              list: dataList,
              pagination: {
                current: Number(payload.page) || 1,
                pageSize: Number(payload.pageSize) || 10,
                total: dataList.total,
              },
            },
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    *queryByDescription({ payload }, { call, put }) {
      try {
        const { success, data } = yield call(queryUserFilter, payload)
        console.log('result', data)
        if (success) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: {
                current: Number(payload.page) || 1,
                pageSize: Number(payload.pageSize) || 10,
                total: data.total,
              },
            },
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
  },

  reducers: {},
})
