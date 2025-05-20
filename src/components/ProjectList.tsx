import React from 'react';
import ProjectItem, { Project } from './ProjectItem';

interface Props {
  projects: Project[];
  now: number;
  formatTime: (ms: number) => string;
  onToggle: (id: number) => void;
}

export default function ProjectList({ projects, now, formatTime, onToggle }: Props) {
  return (
    <ul className="project-list list-unstyled p-0">
      {projects.map(project => (
        <ProjectItem
          key={project.id}
          project={project}
          now={now}
          formatTime={formatTime}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
