export interface Story {
    id: string
    imageUrl: string
  }
  
  export interface User {
    id: string
    username: string
    avatar: string
    stories: Story[]
  }