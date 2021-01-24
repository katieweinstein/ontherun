// This file stores running times in the store.

const GET_TIMES = 'GET_TIMES'

const getTimes = (times) => ({type: GET_TIMES, times})

export const sendAllTimes = (times) => dispatch => {
  dispatch(getTimes(times));
}

const defaultData = []

export default function(state = defaultData, action) {
  switch (action.type) {
    case GET_TIMES:
      return action.times
    default:
      return state
  }
}
