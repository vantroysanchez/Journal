//Son sincronas y hacer la modificación del state

export const setEntries = ( state, entries) => {
    state.entries = [...state.entries, ...entries]
    state.isLoading = false
}

export const createEntry = ( state, entry ) => {

    state.entries = [entry, ...state.entries]
}

export const updateEntry = ( state, entry ) => {

    const index = state.entries.map(e => e.id).indexOf( entry.id)

    state.entries[index] = entry
}

export const deleteEntry = ( state, id ) => {
   state.entries = state.entries.filter(e => e.id !== id)
}

export const clearEntries = ( state ) => {
    state.entries = []
}