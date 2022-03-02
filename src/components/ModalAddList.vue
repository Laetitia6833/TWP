<template>
  <div class="modal">
    <button type="button" @click="close" class="btn-close btn-bottom">X</button>
    <div>
      <h1>Add a Category</h1>
    </div>
    <transition name="fade">
      <div class="error" v-if="error">
        <p>{{ this.error }}</p>
      </div>
    </transition>
    <input
      @keyup.enter="addNewCategory"
      v-model="category.title"
      type="text"
      class="modal-text"
    />
    <button @click="addNewCategory" class="btn-add btn-bottom">Add</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ModalList",

  data() {
    return {
      category: {
        title: "",
        slug: "",
      },
      error: "",
    };
  },

  methods: {
    addNewCategory() {
      if (this.category.title !== "") {
        this.$store.dispatch("addNewCategory", {
          category: {
            title: this.category.title,
            slug: this.category.title,
          },
        });
        axios
          .post(
            `${localStorage.getItem("url")}categories`,
            {
              name: this.category.title,
              slug: this.category.slug,
            },

            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 201) {
              window.location = "/";
            }
          });
      } else {
        this.error = "Please enter a title";
      }
    },

    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal {
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  min-width: 250px;
}
h1 {
  font-size: 20px;
  margin: 30px;
}
.modal-text {
  display: block;
  padding: 10px;
  margin: 20px auto;
  width: 80%;
}
.btn-bottom {
  margin: 10px;
}
.btn-bottom:hover {
  background: rgb(180, 180, 182);
}
.btn-close {
  position: absolute;
  height: 30px;
  width: 30px;
  top: 0;
  right: 0;
  transform: translate(82%, -82%);
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  background: rgb(243, 40, 40);
  color: white;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-add {
  width: 80%;
  padding: 10px;
  text-transform: uppercase;
  font-weight: bold;
  background: rgb(99, 219, 255);
  border: none;
  transition: all 0.3s;
  cursor: pointer;
  margin-bottom: 20px;
  /* margin-top: 20px; */
}
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  background: rgb(250, 113, 113);
  color: rgb(177, 0, 0);
  margin: auto;
  height: 30px;
  border: 1px solid rgb(177, 0, 0);
  border-radius: 5px;
}
</style>
