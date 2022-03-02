import axios from "axios";
import { createStore } from "vuex";

// changement d'url et token à faire ici
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93b3JkcHJlc3MiLCJpYXQiOjE2Mzg4MDc3NjcsIm5iZiI6MTYzODgwNzc2NywiZXhwIjoxNjM5NDEyNTY3LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.aBELoVgVOehUb4gRsdhA1FkJfao8atTeMNLfGLaYpcY";
const url = "http://wordpress/wp-json/wp/v2/";

// store du token et url
localStorage.setItem("token", token);
localStorage.setItem("url", url);

export default createStore({
  state: {
    posts: [],
    post: [],
    categories: [],
    comments: [],
    category: [],
  },

  getters: {
    getCommentsByPost: (state) => (postId) => {
      return state.comments.filter((comment) => comment.post === postId);
    },
  },

  mutations: {
    // CATEGORIES
    GET_CATEGORIES(state, categories) {
      state.categories = categories;
    },

    ADD_NEW_CATEGORY(state, category) {
      state.categories.push(category);
    },

    // POSTS
    GET_POST(state, post) {
      state.post = post;
    },

    ADD_NEW_POST(state, post) {
      state.posts.push(post);
    },

    ADD_COMMENT(state, comment) {
      state.comments.push(comment);
    },

    DELETE_POST(state, post) {
      let index = state.posts.indexOf(post);
      state.posts.splice(index, 1);
    },

    DELETE_CATEGORY(state, category) {
      let index = state.categories.indexOf(category);
      state.categories.splice(index, 1);
    },

    // COMMENTS
    GET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    GET_POSTS(state, posts) {
      state.posts = posts;
    },
    DELETE_COMMENT(state, comment) {
      let index = state.comments.findIndex((c) => c.id == comment.id);
      state.comments.splice(index, 1);
    },
  },

  actions: {
    // 12.34.56.78
    async getPost({ commit }, postId) {
      const response = await axios.get(`${url}${postId}`);
      commit("GET_POST", response.data);
    },

    async getPosts({ commit }) {
      const response = await axios.get(`${url}posts`);
      commit("GET_POSTS", response.data);
    },

    async getPostsByCategory({ commit }, categoryId) {
      const response = await axios.get(
        `${url}posts?category_id=${categoryId}"`
      );
      commit("GET_POSTS_BY_CATEGORY", response.data);
    },

    async getCategories({ commit }) {
      const response = await axios.get(`${url}categories?orderby=id`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("GET_CATEGORIES", response.data);
    },

    addNewCategory({ commit }, category) {
      commit("ADD_NEW_CATEGORY", category);
      // console.log(category);
    },
    // updateCategory({ commit }, category) {
    //   commit("UPDATE_CATEGORY", category);
    // },
    addNewComment({ commit }, comment) {
      commit("ADD_NEW_COMMENT", comment);
      // axios.post(`${url}comments`,)
    },

    async getComments({ commit }) {
      const response = await axios.get(`${url}comments`);
      commit("GET_COMMENTS", response.data);
    },

    // POSTS \\
    addNewPost({ commit }, post) {
      commit("ADD_NEW_POST", post);
    },

    deletePost({ commit }, post) {
      commit("DELETE_POST", post);
      axios.delete(`${url}posts/${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    deleteCategory({ commit }, category) {
      commit("DELETE_CATEGORY", category);
      axios.delete(`${url}categories/${category.id}?force=true`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    // updateCategory({ commit }, category) {
    //   let title = this.category.name
    //   commit("UPDATE_CATEGORY", category);
    //   axios.put(`${url}categories/${category.id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    // },

    addComment({ commit }, comment) {
      commit("ADD_COMMENT", comment);
    },
  },
});
