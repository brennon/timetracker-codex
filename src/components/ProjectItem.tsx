import React from 'react';

export interface Project {
  id: number;
  name: string;
  totalTime: number;
  isRunning: boolean;
  startTime?: number;
}

interface Props {
  project: Project;
  now: number;
  formatTime: (ms: number) => string;
  onToggle: (id: number) => void;
}

export default function ProjectItem({ project, now, formatTime, onToggle }: Props) {
  const runningTime = project.isRunning && project.startTime ? now - project.startTime : 0;
  return (
    <li className="project-item">
      <span>{project.name}</span>
      <span>{formatTime(project.totalTime + runningTime)}</span>
      <button onClick={() => onToggle(project.id)}>
        {project.isRunning ? 'Stop' : 'Start'}
      </button>
    </li>
  );
}
