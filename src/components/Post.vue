<template>
  <div class="post">
    <button class="btn-close" @click="close">X</button>
    <div class="tc-note">
      <div class="tc-note-title">
        <input v-model="this.title" type="text" />
      </div>
      <!-- <p>{{ post.content.rendered }}</p> -->
      <textarea v-model="this.content"></textarea>
      <div class="date">
        <div class="tc-comment-date">created: {{ post.date }}</div>
        <div class="tc-comment-date" v-if="post.date !== post.modified">
          updated: {{ post.modified }}
        </div>
      </div>
    </div>
    <hr />
    <div class="tc-comment">
      <div class="tc-comment-title">
        <p><em>Comments</em></p>
      </div>
      <div class="tc-comment">
        <!-- <transition-group name="slide"> -->
        <transition-group
          name="slide"
          tag="div"
          v-for="comment in comments"
          :key="comment.id"
        >
          <div class="comment">
            <p>{{ removeP(comment.content.rendered) }}</p>
            <button @click="deleteComment(comment)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <div class="tc-comment-date">
            {{
              new Date(comment.date).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </div>
          <hr />
        </transition-group>
        <!-- </transition-group> -->
        <transition-group name="slide">
          <div v-for="com in newComments" :key="com.index">
            <div class="comment">
              <p>{{ com.content }}</p>
              <button @click="deleteCom(com)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div class="tc-comment-date">
              {{ com.date }}
            </div>
            <hr class="hr" />
          </div>
        </transition-group>
      </div>
      <div class="add-comment">
        <p>Write a comment</p>
        <div class="input">
          <input v-model="newComment" type="text" />
          <button @click="addComment">Send</button>
        </div>
      </div>
      <button class="btn-save" @click="save">Save</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["post"],
  data() {
    return {
      title: this.removeP(this.post.title.rendered),
      content: this.removeP(this.post.content.rendered),
      newComment: "",
      newComments: [],
    };
  },
  methods: {
    addComment() {
      this.$store.dispatch("addComment", {
        comment: {
          content: this.newComment,
          post: this.post.id,
        },
      });
      this.newComments.push({
        content: this.newComment,
        date: new Date().toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      this.newComment = "";
    },
    save() {
      const requests = async () => {
        await axios.all([
          this.newComments.forEach((comment) => {
            axios.post(`${localStorage.getItem("url")}comments`, {
              content: comment.content,
              post: this.post.id,
            });
          }),
          axios.put(
            `${localStorage.getItem("url")}posts/${this.post.id}`,
            {
              title: this.title,
              content: this.content,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
        ]);
      };
      const send = async () => {
        await requests();
        window.location = "/";
      };
      send();
    },

    close() {
      this.$emit("close");
    },
    removeP(string) {
      let str = string.replace("<p>", "");
      str = str.replace("</p>", "");
      return str;
    },
    deleteCom(com) {
      this.newComments = this.newComments.filter((i) => i !== com);
    },
    deleteComment(comment) {
      this.$store.commit("DELETE_COMMENT", comment);
      // comment.delete(comment.id);
      axios.delete(`${localStorage.getItem("url")}comments/${comment.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    },
  },
  computed: {
    comments() {
      return this.$store.state.comments.filter((comments) => {
        return comments.post == this.post.id;
      });
    },
  },

  created() {
    this.$store.dispatch("getComments");
  },
};
</script>

<style scope>
hr {
  border: 0;
  height: 1px;
  position: relative;
  margin: 20px auto;
  background: #000;
  overflow: visible;
}
hr:after {
  content: "";
  width: 6px;
  height: 6px;
  background: black;
  display: inline-block;
  border: 2px solid black;
  /* border-radius: 50%; */
  transform: rotate(45deg);
  position: absolute;
  top: -3px;
  left: 50%;
  margin: 0 0 0 -3px;
}
.post {
  max-width: 600px;
  width: 80%;
  text-align: left;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  background: rgb(255, 255, 255);
  top: 20px;
  overflow-y: scroll;
  /* overflow-x: none; */
  height: 90%;
  z-index: 500;
}
.btn-close {
  position: fixed;
  height: 30px;
  width: 30px;
  top: 0;
  right: 0;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  background: rgb(243, 40, 40);
  color: white;
  font-weight: bold;
  transition: all 0.3s;
}
.tc-note {
  text-align: center;
  margin-top: 20px;
}
.tc-note-title {
  margin-bottom: 10px;
}
.tc-note-title input {
  line-height: 20px;
  padding: 5px;
  width: 70%;
  background: none;
  border: none;
  border-bottom: 1px solid black;
}
textarea {
  width: 70%;
  min-height: 70px;
  background: none;
  resize: none;
  padding: 5px;
  font-family: sans-serif;
  letter-spacing: 1px;
}
.btn-return {
  background: rgb(18, 2, 75);
  display: flex;
  justify-content: right;
  border: none;
  padding: 10px;
  color: honeydew;
}
.tc-comment-title {
  font-size: 20px;
  color: rgb(18, 2, 75);
  text-decoration: underline;
  margin-bottom: 15px;
}
.comment {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment button {
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s;
}
.comment button:hover {
  transform: scale(1.2);
  color: rgb(250, 65, 65);
}
.tc-comment-date {
  font-size: 10px;
  display: flex;
  justify-content: right;
  padding: 10px;
  color: gray;
}
.tc-comment {
  padding-right: 50px;
  padding-left: 50px;
}

.add-comment {
  margin-top: 20px;
  text-align: center;
}
.add-comment p {
  margin-bottom: 10px;
}
.input {
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  height: 30px;
}
.input input {
  width: 80%;
  height: 100%;
  padding: 5px;
  border-right: none;
}
.input button {
  width: 20%;
  /* padding: 5px; */
  border-left: none;
  height: 100%;
  cursor: pointer;
  background: rgb(106, 133, 255);
  color: white;
  letter-spacing: 1px;
}

.btn-save {
  display: block;
  height: 35px;
  width: 70%;
  margin: 20px auto;
  background: rgb(81, 221, 81);
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s;
  cursor: pointer;
}

.btn-save:hover {
  background: hsl(120, 47%, 38%);
}

.slide-enter {
  transform: translateY(-100px);
}
.slide-enter-to {
  transform: translateY(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>
