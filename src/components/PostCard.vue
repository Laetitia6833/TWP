<template>
  <div>
    <div v-if="post" @click="modalUpdate(post.id)" class="tc-note-body">
      <div class="post-title">
        {{ post.title.rendered }}
      </div>
      <div class="actions">
        <div class="comment" v-if="comments > 0">
          <i class="far fa-comment-alt"></i>
          <span>{{ comments }}</span>
        </div>
        <button class="delete-btn" type="button" @click="deletePost(post)">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    <transition name="fade">
      <div
        v-show="isModalUpdateVisible"
        @close="closeModalUpdate"
        class="modal-background"
      ></div>
    </transition>
    <transition name="fade">
      <post
        :post="post"
        v-show="isModalUpdateVisible"
        @close="closeModalUpdate"
      />
    </transition>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
// import axios from "axios";
export default {
  props: ["post"],

  components: {
    Post,
  },

  data() {
    return {
      isModalUpdateVisible: false,
    };
  },

  methods: {
    modalUpdate() {
      this.isModalUpdateVisible = true;
    },
    deletePost(post) {
      // post.deleted = true;
      this.$store.dispatch("deletePost", post);
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    },
    closeModalUpdate() {
      this.isModalUpdateVisible = false;
    },
  },
  computed: {
    comments() {
      return parseInt(
        this.$store.getters.getCommentsByPost(this.post.id).length
      );
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
}
.tc-note-title {
  background: rgb(18, 2, 75);
  color: aliceblue;
  padding: 2px;
}
.tc-note-add {
  background: rgb(18, 2, 75);
  color: aliceblue;
  font-size: 25px;
}
.actions {
  display: flex;
  align-items: center;
}
.comment {
  height: 100%;
  position: relative;
  margin-right: 5px;
}
.comment span {
  position: absolute;
  left: 34%;
  top: 3px;
  font-size: 12px;
}
.fa-comment-alt {
  font-size: 22px;
  transform: scaleX(-100%);
}
.tc-bottom {
  background: white;
  border-radius: 5px;
}
.tc-note-add:hover {
  background: rgba(18, 2, 75, 0.5);
  color: rgb(18, 2, 75);
  transition: all 0.3s;
}
.tc-note-body {
  padding: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  width: 90%;
  margin: 10px auto;
  cursor: pointer;
}
hr {
  background-color: rgba(18, 2, 75, 0.3);
  margin: 0;
  margin-top: 5px;
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
}
.btn-div {
  display: flex;
  justify-content: right;
}
.delete-btn {
  background: none;
  color: aliceblue;
  border: none;
  cursor: pointer;
}

.delete-btn .fa-trash {
  font-size: 20px;
  color: rgb(241, 87, 87);
  transition: all 0.3s;
}
.delete-btn .fa-trash:hover {
  color: rgb(179, 12, 12);
}
.div-btn {
  display: flex;
  justify-content: right;
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
