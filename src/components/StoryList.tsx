import { User } from "../types"

interface StoryListProps {
  users: User[]
  openStory: (index: number) => void
}

const StoryList = ({ users, openStory }: StoryListProps) => {
  return (
    <div className="story-list">
      {users.map((user, index) => (
        <button
          key={user.id}
          className="story-button"
          onClick={() => openStory(index)}
        >
          <div className="story-avatar-container">
            <img
              src={user.avatar}
              alt={`${user.username}'s story`}
              className="story-avatar"
            />
          </div>
          <p className="story-username">{user.username}</p>
        </button>
      ))}
    </div>
  )
}

export default StoryList;