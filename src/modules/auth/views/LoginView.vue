<template>
  <div class="auth-body text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="onSubmit" class="form-signin">
        <h1 class="h3 mb-3 fw-normal">Inicio</h1>

        <div class="form-floating">
          <input
            v-model="userForm.email"
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Correo</label>
        </div>

        <div class="form-floating">
          <input
            v-model="userForm.password"
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Contraseña</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Entrar
        </button>

        <div class="container-login100-form-btn m-t-32">
          <router-link :to="{ name: 'register' }"
            >¿No tienes cuenta?</router-link
          >
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import Swal from "sweetalert2";
import useAuth from "../composables/useAuth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const { signInUser } = useAuth();
    const userForm = ref({
      email: "",
      password: "",
    });

    return {
      userForm,
      onSubmit: async () => {
        const { ok, message } = await signInUser(userForm.value);

        if (!ok) {
          Swal.fire("Error", message, "error");
        } else {
          router.push({ name: "no-entry" });
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

@import "../css/signin.css";
</style>
