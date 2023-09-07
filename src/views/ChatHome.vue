<template>
  <div class="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">

  <!-- Component Start -->
  <div class="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
    <div class="flex flex-col flex-grow h-0 p-4 overflow-auto" >
      <div v-for="{ id, userName, userId, userPhotoURL, text, createdAt} in messages" :key="id">
        <!--      the left card side begin-->
        <div class="flex w-full mt-2 space-x-3 max-w-xs" v-if="userId === user.uid">
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
            <img class="rounded-full" :src="userPhotoURL ? userPhotoURL : 'https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?h=200&fakeurl=1&type=.webp' " alt="">
          </div>
          <div>
            <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
              <h3>{{ userName }}</h3>
              <p class="text-sm">{{ text }}</p>
            </div>
            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
          </div>
        </div>
        <!--      the left card side end-->

        <!--      the right card side begin-->
        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end" v-else>
          <div>
            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
              <h3>{{ userName }}</h3>
              <p class="text-sm">{{ text }}</p>
            </div>
            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
          </div>
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
            <img class="rounded-full" :src="userPhotoURL ? userPhotoURL : 'https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?h=200&fakeurl=1&type=.webp' " alt="">
          </div>
        </div>
      </div>
      <!--      the right card side end-->
      </div>






    <div class="bg-gray-300 p-4">
      <input class="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" v-model="message" @keydown.enter="send">
    </div>
  </div>
  <!-- Component End  -->
  </div>
</template>

<script setup>
import {ref, watch, nextTick} from 'vue'
import {useAuth, useChat} from "@/firebase";

const {user, isLogin, signOut, signIn} = useAuth()
let {messages, sendMessage} = useChat()

const message = ref('')
const send  = () => {
  sendMessage(message.value)
  //reinitialise la valeur de message de value
  message.value = " "
}
//
// watch(messages, async (newValue, oldValue) => {
//   if (Object.keys(newValue).length !== 0) {
//     console.log(messages)
//   }
// })

</script>

<style scoped>

</style>