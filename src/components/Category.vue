<template>
  <div>
    <div class="tc-note">
      <div class="tc-note-title">
        <!-- <h2>{{ category.name }}</h2> -->
        <input
          @change="updateCategory"
          v-model="this.categoryName"
          type="text"
          class="update-category"
        />
        <div class="btn-del-cat">
          <button
            class="tc-note-delete"
            type="button"
            @click="deleteCategory(category, posts)"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <div v-for="post in posts" :key="post.id">
        <div v-if="category.id === post.categories[0]">
          <post-card :post="post" />
          <hr />
        </div>

        <!-- <transition name="fade"> -->

        <!-- </transition> -->
      </div>
      <div class="tc-bottom">
        <button type="button" @click="openTaskModal()" class="tc-note-add">
          +
        </button>
      </div>
      <!-- MODAL BACKGROUND -->
      <transition name="fade">
        <div
          v-show="isModalVisible"
          @close="closeModal"
          class="modal-background"
        ></div>
      </transition>
      <!-- MODAL -->
      <transition name="bounce">
        <modal-task
          v-show="isModalVisible"
          @close="closeModal"
          :category="category"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import ModalTask from "@/components/AddTaskModal.vue";
import PostCard from "./PostCard.vue";
import axios from "axios";

export default {
  components: {
    ModalTask,
    PostCard,
  },

  props: ["category"],

  data() {
    return {
      isModalShow: false,
      isModalVisible: false,
      categoryName: this.category.name,
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  created() {
    this.$store.dispatch("getPosts");
  },

  methods: {
    openTaskModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    deleteCategory(category, posts) {
      this.$store.dispatch("deleteCategory", category);
      let arrPosts = [];
      posts.forEach((p) => {
        if (p.categories[0] == category.id) {
          arrPosts.push(p);
        }
      });
      arrPosts.forEach((post) => {
        this.$store.dispatch("deletePost", post);
      });
    },
    updateCategory() {
      console.log(this.category);
      axios
        .put(
          `${localStorage.getItem("url")}categories/${this.category.id}`,
          {
            name: this.categoryName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => console.log(res));
      console.log(this.category);
      // axios.put(
      //   `${this.category.link}`,
      //   {
      //     name: this.name,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("token")}`,
      //       "Access-Control-Allow-Origin": `${localStorage.getItem("url")}`,
      //     },
      //   }
      // );
    },
  },
};
</script>
<style scoped>
.tc-note {
  border: 1px solid rgb(18, 2, 75);
  /* margin: 10px; */
  width: 300px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.651);
}
.tc-note-title {
  background: rgb(18, 2, 75);
  color: aliceblue;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 40px;
}

.tc-note-title h2 {
  margin-right: auto;
  margin-left: auto;
}
.update-category {
  color: white;
  font-size: 18px;
  text-align: center;
  letter-spacing: 1px;
}
.tc-note-add {
  background: rgba(18, 2, 75, 0.863);
  color: aliceblue;
  font-size: 25px;
  width: 100%;
  border: none;
  cursor: pointer;
}
.tc-bottom {
  /* background: white; */
  border-radius: 5px;
}
.tc-note-add:hover {
  background: rgba(18, 2, 75, 0.5);
  color: white;
  transition: all 0.3s;
}
.tc-note-body {
  padding: 10px;
  background: white;
}
hr {
  background-color: rgba(18, 2, 75, 0.3);
  margin: 2px;
}
.tc-note-delete {
  width: 24px;
  height: 24px;
  /* border-radius: 50%; */
}
.tc-note-delete:hover {
  background-color: rgb(252, 252, 252);
  color: rgb(18, 2, 75);
}
.btn-del-cat {
  display: flex;
  justify-content: right;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
}

.btn-del-cat button {
  height: 100%;
  border: none;
  width: 30px;
  cursor: pointer;
}
.btn-div {
  display: flex;
  justify-content: right;
}
.delete-btn {
  background: rgb(18, 2, 75);
  color: aliceblue;
}
.delete-btn:hover {
  background: rgb(179, 12, 12);
}
.modal-in-enter-active,
.modal-in-leave-active {
  transition: opacity 0.5s;
}
.modal-in-enter, .modal-in-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.5s;
}
.fade-in-enter, .fade-in-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
