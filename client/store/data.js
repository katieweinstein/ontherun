// import axios from 'axios'
// import history from '../history'

const GET_ALL_DATA = 'GET_ALL_DATA'

const getAllData = (data) => ({type: GET_ALL_DATA, data})

export const sendAllData = (data) => dispatch => {
  dispatch(getAllData(data));
}

const defaultData = {};

export default function(state = defaultData, action) {
  switch (action.type) {
    case GET_ALL_DATA:
      return action.data
    default:
      return state
  }
}
