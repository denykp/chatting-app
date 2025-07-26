export interface Message {
  origin: string
  message: string
  product?: {
    product_name: string
    image_path: string
    product_price: number
  }
}

export interface Conversation {
  room_id: string
  messages: Message[]
}
