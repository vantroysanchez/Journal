//Se utilizan para traer información del state
// export const BaseGetter = async ({ state}) => {
//  return state
// }


export const getEntriesByTerm = ( state ) => (term = '') => {
    
    if(term.length === 0) return state.entries
  
    return state.entries.filter( entry => entry.text.toLowerCase().includes(term.toLocaleLowerCase()))
}

export const getEntryById = ( /*state*/ ) => {
 
}