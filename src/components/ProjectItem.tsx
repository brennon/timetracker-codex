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
    <li className="project-item card mb-3">
      <div className="project-header card-body d-flex justify-content-between align-items-center">
        <div className="project-info d-flex gap-3 flex-grow-1 justify-content-between">
          <span className="project-name fw-bold">{project.name}</span>
          <span className="project-time">{formatTime(runningTime)}</span>
        </div>
        <button className="btn btn-outline-primary" onClick={() => onToggle(project.id)}>
          {project.isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
      <ul className="activity-list list-unstyled mb-0 px-3 pb-3">
        {Object.entries(totals).map(([desc, time]) => (
          <li key={desc}>{`${desc} - ${formatTime(time)}`}</li>
        ))}
      </ul>
    </li>
  );
}
