import { get, submitForm } from 'redux/modules/MolgenisApi'
import { getAllGenesPresent } from './Variants'
import { showAlert } from 'redux/modules/Alerts'

// ------------------------------------
// Constants
// ------------------------------------
export const SET_GN_SCORES = 'Gavin.SET_GN_SCORES'

export const constants = { SET_GN_SCORES }

// ------------------------------------
// Action creators
// ------------------------------------
export function setGeneNetworkScores (phenotype, scores) {
  return {
    type    : SET_GN_SCORES,
    payload : { phenotype, scores }
  }
}

export const actions = { setGeneNetworkScores }

// ------------------------------------
// Thunks
// ------------------------------------
export function fetchGeneNetworkScores (phenotype) {
  return function (dispatch, getState) {
    const { session : { server, token }, gavin } = getState()
    const genes = getAllGenesPresent(gavin.entities).join()
    const body = {
      rows: genes,
      columns: phenotype.primaryID
    }
    return get(server, `matrix/sys_Matrix?q=columns==${phenotype.primaryID};rows=${genes}`, token)
      .then((json) => {
        console.log(json)
        const scores = {}
        if (json.items.length === 0) {
          dispatch(showAlert('warning', 'No Gene Network scores were found for phenotype[' +
              phenotype.name + '(' + phenotype.primaryID + ')]', 'Unable to determine gene priority order'))
        }
        json.items.forEach(function (score) {
          const geneID = score.hugo
          if (scores.hasOwnProperty(geneID)) {
            console.log(scores)
            dispatch(showAlert('warning', 'More than one Gene Network score found for combination of gene[' +
                geneID + ')] and phenotype[' + phenotype.primaryID + ')]', ''))
            scores[geneID] = undefined
          } else {
            scores[geneID] = score.score
          }
        })
        dispatch(setGeneNetworkScores(phenotype, scores))
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_GN_SCORES] : (state, action) => {
    const { phenotype : { primaryID }, scores } = action.payload
    return {
      ...state,
      scores : {
        ...state.scores,
        [primaryID] : scores
      }
    }
  }

}

// ------------------------------------
// Selectors
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
export const defaultState = { scores : {} }

export default function gavinReducer (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
