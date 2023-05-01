<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>

      <div>
        <input
          type="file"
          @change="selectedImage"
          ref="imageSelector"
          v-show="false"
          accept="image/png, image/jpeg"
        />

        <button
          class="btn btn-danger mx-2"
          v-if="entry.id"
          @click="DeleteEntry(entry.id)"
        >
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary" @click="onSelectImage">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />

    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text">
      </textarea>
    </div>

    <!-- <img
      src="https://educacion30.b-cdn.net/wp-content/uploads/2019/02/girasoles-978x652.jpg"
      alt="entry-picture"
      class="img-thumbnail"
    /> -->

    <img
      v-if="localImage"
      :src="localImage"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>

  <Fab icon="fa-save" @on:click="saveEntry" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
import getDayMonthYear from "../helpers/getDayMonthYear";
import uploadImage from "../helpers/uploadImage";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },

  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },

  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
    };
  },
  methods: {
    ...mapActions("journal", [
      "updateEntries",
      "createEntries",
      "deleteEntries",
    ]),

    loadEntry() {
      let entry;

      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);

        if (!entry) return this.$router.push({ name: "no-entry" });
      }

      this.entry = entry;
    },
    async saveEntry() {
      new Swal({
        title: "Espere por favor",
        allowOutsideClick: false,
      });

      Swal.showLoading();

      const picture = await uploadImage(this.file);

      this.entry.picture = picture;

      if (this.entry.id) {
        await this.updateEntries(this.entry);
      } else {
        const id = await this.createEntries(this.entry);

        this.$router.push({ name: "entry", params: { id } });
      }

      this.file = null;
      Swal.fire("Guardado", "Entrada registrada correctamente", "success");
    },
    async DeleteEntry(id) {
      const { isConfirmed } = await Swal.fire({
        title: "¿Está seguro?",
        text: "No se podrá revertir los cambios",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
      });

      if (isConfirmed) {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.deleteEntries(id);
        this.$router.push({ name: "no-entry" });

        Swal.fire("Eliminado", "", "success");
      }
    },

    selectedImage(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }

      this.file = file;

      const fileReader = new FileReader();
      fileReader.onload = () => (this.localImage = fileReader.result);
      fileReader.readAsDataURL(file);
    },

    onSelectImage() {
      this.$refs.imageSelector.click();
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  border: none;
  font-size: 20px;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
