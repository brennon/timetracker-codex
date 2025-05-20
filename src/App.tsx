import React, { useEffect, useState } from 'react';

interface Project {
  id: number;
  name: string;
  totalTime: number; // in ms
  isRunning: boolean;
  startTime?: number;
}

const loadProjects = (): Project[] => {
  if (typeof localStorage === 'undefined') {
    return [];
  }
  const data = localStorage.getItem('projects');
  return data ? JSON.parse(data) : [];
};

const saveProjects = (projects: Project[]) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('projects', JSON.stringify(projects));
};

export default function App() {
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [name, setName] = useState('');
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  const addProject = () => {
    if (!name.trim()) return;
    setProjects([
      ...projects,
      { id: Date.now(), name, totalTime: 0, isRunning: false },
    ]);
    setName('');
  };

  const toggleTimer = (id: number) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === id) {
          if (p.isRunning && p.startTime) {
            const elapsed = Date.now() - p.startTime;
            return { ...p, isRunning: false, totalTime: p.totalTime + elapsed, startTime: undefined };
          }
          return { ...p, isRunning: true, startTime: Date.now() };
        }
        if (p.isRunning && p.startTime) {
          const elapsed = Date.now() - p.startTime;
          return { ...p, isRunning: false, totalTime: p.totalTime + elapsed, startTime: undefined };
        }
        return p;
      })
    );
  };

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((totalSec % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div>
      <h1>Time Tracker</h1>
      <div>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Project name"
        />
        <button onClick={addProject}>Add Project</button>
      </div>
      <ul>
        {projects.map(p => {
          const runningTime = p.isRunning && p.startTime ? now - p.startTime : 0;
          return (
            <li key={p.id}>
              <span>{p.name}</span>
              <span> {formatTime(p.totalTime + runningTime)}</span>
              <button onClick={() => toggleTimer(p.id)}>
                {p.isRunning ? 'Stop' : 'Start'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
