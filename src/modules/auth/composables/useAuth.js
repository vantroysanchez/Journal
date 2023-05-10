import { computed } from "vue";
import { useStore } from "vuex";

const useAuth = () =>{

    const store = useStore()

    const createUser = async (user) =>{        
        const resp = await store.dispatch('auth/createUser', user)
        return resp
    }

    const signInUser = async (user) =>{        
        const resp = await store.dispatch('auth/signInUser', user)
        return resp
    }

    const checkAuthStatus = async () =>{        
        const resp = await store.dispatch('auth/checkAuthentication')
        return resp
    }

    return{
        createUser,
        signInUser,
        checkAuthStatus,

        authStatus: computed(()=> store.getters['auth/currentState'])
    }

}

export default useAuth