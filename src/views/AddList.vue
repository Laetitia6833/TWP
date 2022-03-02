<template>
  <div>
    <h1>Add a List</h1>
    <input v-model="category.title" type="text" />
    <button @click="addNewCategory">Add</button>
  </div>
</template>


<script>
// import WPAPI from "wpapi";
// import axios from "axios";

// var wp = new WPAPI({
//   endpoint: "http://wordpress:8000/wp-json/",
//   username: "damien",
//   password: "damien",
//   auth: true,
// });
// let categories = wp.categories().get();
// console.log(categories);
export default {
  //   props: ["Categories"],

  data() {
    return {
      category: {
        title: "",
        slug: "",
      },
      //   category: {
      //     title: "",
      //   },
    };
  },

  computed: {
    // categories() {
    //   return this.$store.state.categories;
    // },
  },

  methods: {
    addNewCategory() {
      this.$store.dispatch("addNewCategory", {
        category: {
          title: this.category.title,
          slug: this.category.title,
        },
      });
      // axios.post(
      //   "http://wordpress:8000/wp-json/wp/v2/categories",
      //   {
      //     name: this.category.title,
      //     slug: this.category.slug,
      //   },
      //   {
      //     headers: {
      //       Authorization:
      //         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93b3JkcHJlc3M6ODAwMCIsImlhdCI6MTYzNzgzMzAwNywibmJmIjoxNjM3ODMzMDA3LCJleHAiOjE2Mzg0Mzc4MDcsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.qTq7_M0aDkdA_s1kf2dpN7JFsWrRCmWDUn4saPjPqh8",
      //     },
      //   }
      // );

      // console.log("add cat", this.title);
      // axios
      //   .post("http://wordpress:8000/wp-json/wp/v2/categories/", {
      //     name: this.category.title,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   });
    },
  },
};
</script>
