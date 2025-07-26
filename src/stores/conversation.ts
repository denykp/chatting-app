import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Conversation } from '@/types'
import dummy from '@/conversations.json'

export const useConversationStore = defineStore('conversation', () => {
  const conversations = ref<Conversation[]>([])

  const addConversation = (conversation: Conversation) => {
    conversations.value.push(conversation)
  }

  const getConversation = (room_id: string) => {
    const conversation = conversations.value.find(
      (conversation) => conversation.room_id === room_id,
    )
    if (conversation) {
      return conversation
    } else {
      const randomConversation = dummy[Math.floor(Math.random() * dummy.length)]
      addConversation({ room_id, messages: randomConversation })
      return {
        room_id,
        messages: randomConversation,
      }
    }
  }

  const addMessage = (room_id: string, origin: string, message: string) => {
    const conversation = conversations.value.find(
      (conversation) => conversation.room_id === room_id,
    )
    if (conversation) {
      conversation.messages.push({ origin, message })
    }
  }

  return { conversations, getConversation, addMessage }
})
