<template>
  <div class="container mx-auto">
    <div class="columns-2">
      <div id="One">
        <h2>Reception</h2>
        <video id="receiver-video" class="w-full md:w-2/3 lg:w-1/2 h-2/4" controls>
          <source src="">
          Your browser does not support the video tag.
        </video>
        <p>
          <button id="start" @click="createConversation('test')">Demarrer la conversation</button>
        </p>
      </div>
      <div id="Two">
        <h2>Envoi</h2>
        <video id="emitter-video" class="w-full md:w-2/3 lg:w-1/2 h-2/4" controls>
          <source src="">
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>

<script setup>
import { conversations } from "@/apiRTC.config.js"

const createConversation = (name) => {
   conversations(name)
}
</script>

<style scoped>

</style>