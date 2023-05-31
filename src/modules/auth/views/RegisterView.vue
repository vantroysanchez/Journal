<template>
  <div class="auth-body text-center">
    <main class="form-signin w-100 m-auto">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="onSubmit" class="form-signin">
            <h1 class="h3 mb-3 fw-normal">Registrarse</h1>

            <div class="form-floating">
              <input
                v-model="userForm.name"
                class="form-control"
                type="text"
                placeholder="Usuario"
                required
              />
              <label for="floatingInput">Usuario</label>
            </div>

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
              Crear cuenta
            </button>

            <div class="pt-4">
              <router-link :to="{ name: 'login' }"
                >¿Ya tienes una cuenta?</router-link
              >
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import useAuth from "../composables/useAuth";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const { createUser } = useAuth();

    const userForm = ref({
      name: "",
      email: "",
      password: "",
    });

    return {
      userForm,
      onSubmit: async () => {
        const { ok, message } = await createUser(userForm.value);

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
