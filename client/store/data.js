// import axios from 'axios'
// import history from '../history'

const GET_DATA = 'GET_DATA'

const defaultData = []

const getAllData = (data) => ({type: GET_DATA, data})

export const sendAllData = (data) => dispatch => {
  dispatch(getAllData(data));
}

export default function(state = defaultData, action) {
  switch (action.type) {
    case GET_DATA:
      return action.data
    default:
      return state
  }
}
