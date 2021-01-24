const GET_CADENCE_AND_PACE = 'GET_CADENCE_AND_PACE'

const getCadenceAndPace = (cadencePace) => ({type: GET_CADENCE_AND_PACE, cadencePace})

export const sendCadenceAndPace = (cadencePace) => dispatch => {
  dispatch(getCadenceAndPace(cadencePace));
}

const defaultData = []

export default function(state = defaultData, action) {
  switch (action.type) {
    case GET_CADENCE_AND_PACE:
      return action.cadencePace
    default:
      return state
  }
}
