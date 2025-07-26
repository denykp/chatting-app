<script setup lang="ts">
import listRoom from '@/list_rooms.json'
import { useConversationStore } from '@/stores/conversation'
import { computed, ref, toRef } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const { conversations } = useConversationStore()
const lastMessage = (room_id: string, last_comment_text: string) => {
  const conversation = toRef(conversations).value.find(
    (conversation) => conversation.room_id === room_id,
  )
  if (conversation) {
    return conversation.messages[conversation.messages.length - 1].message
  }
  if (last_comment_text.includes('[file]')) {
    return '[Sent a file]'
  }
  return last_comment_text
}

const searchRoom = ref('')
const filteredRooms = computed(() => {
  return listRoom.data.customer_rooms.filter((room) => {
    return room.name.toLowerCase().includes(searchRoom.value.toLowerCase())
  })
})
</script>

<template>
  <div>
    <div class="p-2 border-b bg-neutral-900 border-neutral-600 sticky top-0">
      <input
        v-model="searchRoom"
        type="text"
        class="bg-neutral-600 rounded w-full py-2 px-3 text-neutral-100"
        placeholder="Search..."
      />
    </div>
    <RouterLink
      v-for="(room, index) in filteredRooms"
      :key="`room-${index}`"
      class="flex border-b border-neutral-600 cursor-pointer"
      :class="{ 'bg-neutral-700': room.room_id === route.params.id }"
      :to="`/chat/${room.room_id}`"
    >
      <div class="p-2 flex gap-2">
        <div class="shrink-0">
          <img :src="room.user_avatar_url" alt="User Avatar" width="60px" class="rounded-full" />
        </div>
        <div>
          <div class="text-white">{{ room.name }}</div>
          <div class="text-neutral-500 line-clamp-1">
            {{ lastMessage(room.room_id, room.last_comment_text) }}
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
