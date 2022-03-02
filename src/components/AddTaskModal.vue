<template>
  <div class="modal">
    <div class="modal-title">
      <h1>Add a task</h1>
    </div>
    <transition name="fade">
      <div class="error" v-if="error">
        <p>{{ this.error }}</p>
      </div>
    </transition>

    <input v-model="post.title" type="text" class="modal-text" />
    <textarea v-model="post.content" class="modal-content"></textarea>
    <button @click="savePost" class="btn-bottom btn-add">Add Task</button>
    <button type="button" @click="close" class="btn-bottom btn-close">X</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["category"],

  data() {
    return {
      post: {
        title: "",
        content: "",
      },
      error: "",
    };
  },

  methods: {
    close() {
      this.$emit("close");
      this.error = "";
    },
    savePost() {
      if (this.post.title !== "") {
        this.$store.dispatch("addNewPost", {
          post: {
            title: this.post.title,
            content: this.post.content,
            // status: "publish",
          },
        });
        // console.log(this.post);
        axios
          .post(
            `${localStorage.getItem("url")}posts`,
            {
              title: this.post.title,
              content: this.post.content,
              status: "publish",
              categories: this.category.id,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then(() => {
            window.location = "/";
          });
      } else {
        console.log("please enter a title");
        this.error = "please enter a title";
      }
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
  /* width: 600px; */
  /* height: 300px; */
  z-index: 800;
}
h1 {
  font-size: 20px;
  margin: 10px;
}
.modal-text {
  padding: 10px;
  margin: 10px;
}
.modal-content {
  width: 80%;
  height: 200px;
  margin: 10px;
}
.btn-bottom {
  margin: 10px;
}
.btn-bottom:hover {
  background: rgb(139, 139, 141);
}
.btn-close {
  margin: 0;
  transform: translate(50%, -50%);
}
.btn-add {
  width: 80%;
  background: rgb(50, 214, 50);
  border: none;
  padding: 10px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 0.3s;
  cursor: pointer;
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
