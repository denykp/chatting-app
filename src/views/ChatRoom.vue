<script setup lang="ts">
import { useConversationStore } from '@/stores/conversation'
import type { Conversation } from '@/types'
import { ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { getConversation, addMessage } = useConversationStore()
const conversation = ref<Conversation | null>()
watch(
  () => route.params.id,
  () => {
    conversation.value = getConversation(route.params.id as string)
  },
  { immediate: true },
)

const message = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const sendMessage = () => {
  if (message.value) {
    addMessage(route.params.id as string, 'sent', message.value)
    message.value = ''
  }
}

watch(
  () => conversation.value?.messages?.length,
  async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  },
)
</script>

<template>
  <div class="max-h-screen relative w-full">
    <div
      class="p-4 flex flex-col gap-4 h-fit max-h-[90vh] overflow-y-auto w-full absolute bottom-16"
      ref="messagesContainer"
    >
      <div
        v-for="(message, index) in conversation?.messages"
        :key="`message-${index}`"
        :id="`message-${index}`"
        class="w-full"
      >
        <div class="flex justify-start" :class="{ '!justify-end': message.origin === 'sent' }">
          <div
            class="bg-gray-600 text-white rounded-2xl p-3 max-w-[50vw]"
            :class="{
              '!bg-blue-600': message.origin === 'sent',
              'w-[300px]': message.product,
            }"
          >
            <div v-if="message.product" class="flex flex-col bg-gray-800 p-4 rounded-2xl">
              <img :src="message.product?.image_path" alt="" width="300px" class="my-auto" />
              <div class="mt-4 pt-2 border-t">
                <div class="font-bold">{{ message.product?.product_name }}</div>
                <div>${{ message.product?.product_price }}</div>
              </div>
            </div>
            <div class="mt-2">{{ message.message }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-t bg-neutral-900 border-neutral-600 flex gap-2 p-3 absolute bottom-0 w-full">
      <input
        v-model="message"
        type="text"
        class="bg-neutral-600 rounded-lg w-full py-2 px-3 text-neutral-100"
        placeholder="Write a message..."
        @keyup.enter="sendMessage()"
      />
      <button @click="sendMessage()" class="cursor-pointer px-3 rounded-lg hover:bg-neutral-700">
        Send
      </button>
    </div>
  </div>
</template>
