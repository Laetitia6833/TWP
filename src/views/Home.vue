<template>
  <div class="home">
    <button type="button" class="btn" @click="showModal">Add category</button>
    <categories />

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
      <modal-list v-show="isModalVisible" @close="closeModal" />
    </transition>
  </div>
</template>

<script>
import Categories from "@/components/Categories.vue";
import ModalList from "@/components/ModalAddList.vue";

export default {
  name: "Home",
  components: {
    Categories,
    ModalList,
  },

  data() {
    return {
      isModalVisible: false,
      comment: {},
    };
  },

  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style>
.home {
  margin-top: 50px;
  height: calc(100vh - 50px);
  background: center / cover
    url("https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  overflow: scroll;
}
.btn {
  padding: 5px;
  margin: 10px;
  display: flex;
  position: fixed;
  background: rgba(18, 2, 75, 0.3);
}
.btn:hover {
  background: rgb(18, 2, 75);
  color: aliceblue;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.438);
  display: flex;
  justify-content: center;
  align-items: center;
}
.bounce-enter-active {
  animation: bounce-in 0.7s;
}
.bounce-leave-active {
  animation: bounce-out 0.7s;
}

/* TRANSITION */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ANIMATION */
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.5);
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.5);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
}
</style>
