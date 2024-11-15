import React, { useState, useEffect } from "react";
import { User } from "../types";

interface StoryViewProps {
  user: User;
  storyIndex: number;
  onClose: (e?: React.MouseEvent) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StoryView = ({
  user,
  storyIndex,
  onClose,
  onNext,
  onPrevious,
}: StoryViewProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          onNext();
          return 0;
        }
        return prevProgress + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [user, storyIndex, onNext]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const tapPosition = (clientX - left) / width;
    
    if (tapPosition < 0.3) {
      onPrevious();
    } else if (tapPosition > 0.7) {
      onNext();
    }
  };

  const currentStory = user.stories[storyIndex];

  return (
    <div className="story-view" onClick={handleTap}>
      <div className="progress-bar">
        {user.stories.map((story, index) => (
          <div key={story.id} className="progress-segment">
            <div
              className="progress-fill"
              style={{
                width:
                  index < storyIndex
                    ? "100%"
                    : index === storyIndex
                    ? `${progress}%`
                    : "0%",
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className="story-header">
        <div className="user-info">
          <div className="user-avatar">
            <img
              src={user.avatar}
              alt={user.username}
              className="story-avatar"
            />
          </div>
          <span className="username">{user.username}</span>
        </div>
        <button className="close-button" onClick={(e) => onClose(e)}>
          &times;
        </button>
      </div>
      <div className="story-content">
        <img
          src={currentStory.imageUrl}
          alt={`${user.username}'s story`}
          className="story-image"
        />
      </div>
    </div>
  );
}

export default StoryView