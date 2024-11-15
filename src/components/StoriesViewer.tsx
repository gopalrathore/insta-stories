import { useEffect, useState } from 'react'
import { User } from '../types'
import StoryList from './StoryList'
import StoryView from './StoryView'

export default function StoriesViewer() {
  const [users, setUsers] = useState<User[]>([])
  const [currentUserIndex, setCurrentUserIndex] = useState<number | null>(null)
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/stories.json')
        if (!response.ok) {
          throw new Error('Failed to fetch stories')
        }
        const data = await response.json()
        setUsers(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching stories:', error)
        setError('Failed to load stories. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchStories()
  }, [])

  const openStory = (userIndex: number) => {
    setCurrentUserIndex(userIndex)
    setCurrentStoryIndex(0)
  }

  const closeStory = (e?: React.MouseEvent) => {
    e?.stopPropagation()

    setCurrentUserIndex(null)
    setCurrentStoryIndex(0)
  }

  const goToNextStory = () => {
    if (currentUserIndex === null) return

    const currentUser = users[currentUserIndex]
    if (currentStoryIndex < currentUser.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
    } else if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1)
      setCurrentStoryIndex(0)
    } else {
      closeStory()
    }
  }

  const goToPreviousStory = () => {
    if (currentUserIndex === null) return

    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1)
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1)
      setCurrentStoryIndex(users[currentUserIndex - 1].stories.length - 1)
    }
  }

  if (isLoading) {
    return <div className="loading-container">Loading...</div>
  }

  if (error) {
    return <div className="error-container">{error}</div>
  }

  return (
    <div className='stories-container'>
      <StoryList users={users} openStory={openStory} />
      {currentUserIndex !== null && (
        <StoryView
          user={users[currentUserIndex]}
          storyIndex={currentStoryIndex}
          onClose={closeStory}
          onNext={goToNextStory}
          onPrevious={goToPreviousStory}
        />
      )}
    </div>
  )
}