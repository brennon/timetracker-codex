import React from 'react';

export interface ActivityEntry {
  description: string;
  duration: number;
}

export interface Project {
  id: number;
  name: string;
  isRunning: boolean;
  startTime?: number;
  activities: ActivityEntry[];
}

interface Props {
  project: Project;
  now: number;
  formatTime: (ms: number) => string;
  onToggle: (id: number) => void;
}

export default function ProjectItem({ project, now, formatTime, onToggle }: Props) {
  const runningTime = project.isRunning && project.startTime ? now - project.startTime : 0;
  const totals = project.activities.reduce<Record<string, number>>((acc, act) => {
    acc[act.description] = (acc[act.description] || 0) + act.duration;
    return acc;
  }, {});
  return (
    <li className="project-item">
      <div>
        <span>{project.name}</span>
        <span>{formatTime(runningTime)}</span>
      </div>
      <button onClick={() => onToggle(project.id)}>
        {project.isRunning ? 'Stop' : 'Start'}
      </button>
      <ul>
        {Object.entries(totals).map(([desc, time]) => (
          <li key={desc}>{`${desc} - ${formatTime(time)}`}</li>
        ))}
      </ul>
    </li>
  );
}
