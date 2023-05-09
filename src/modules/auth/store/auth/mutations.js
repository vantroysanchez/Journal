
export const loginUser = (state, {user, idToken, refreshToken}) => {

    if(idToken){
        localStorage.setItem('idToken', idToken)
    }

    if(refreshToken){
        localStorage.setItem('refreshToken', refreshToken)
    }

    state.user          = user
    state.status        = 'authenticated'
    state.idToken       = idToken
    state. refreshToken = refreshToken
}