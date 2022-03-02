<template>
  <div class="tc-notes-wrapper">
    <div class="tc-notes">
      <transition-group name="slide">
        <category
          v-for="category in categories"
          :key="category.id"
          :category="category"
          :class="{ none: category.id === 1 }"
        >
        </category>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Category from "@/components/Category";
export default {
  name: "Categories",

  components: {
    Category,
  },

  computed: {
    categories() {
      return this.$store.state.categories;
    },
  },

  created() {
    this.$store.dispatch("getCategories");
  },
};
</script>
<style>
.tc-notes-wrapper {
  /* margin: 50px; */
  width: auto;
  padding: 30px;
  margin-top: 30px;
}
.tc-notes {
  display: flex;
  gap: 10px;
}
.none {
  display: none;
}
</style>
