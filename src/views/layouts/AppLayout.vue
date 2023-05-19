<script setup>
import Header from "@/views/components/Header.vue";
import Sidebar from "@/views/components/Sidebar.vue";
import {onMounted} from "vue";

onMounted(() => {
  let btn = $('#btn-scroll')[0]
  window.onscroll = function() {scrollFunction(btn)};
})
function scrollFunction(btn) {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
</script>

<template>
  <div>
    <Sidebar id="sidebar"></Sidebar>
    <div id="content">
      <Header></Header>
      <main>
        <div id="view" class="m-5">
          <router-view />
        </div>
        <div id="btn-scroll" class="fixed">
          <button @click="topFunction" class="btn btn-primary btn-sm"><i class="bi bi-arrow-up"></i></button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@media  screen and (max-width:450px) {
  #view{
    margin: 10px !important;
  }
}

@media  screen and (max-width:768px) {
  #sidebar {
    display: none;
    visibility: hidden;
    width: 0;
  }

  #content{
    margin-left: 0 !important;
  }
}

#content{
  margin-left: 4.5rem;
}

div.fixed {
  display: none;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
}
</style>