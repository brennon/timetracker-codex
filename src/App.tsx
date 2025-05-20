import React, { useEffect, useState } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import { Project } from './components/ProjectItem';
import './App.css';

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
    setProjects(prev => {
      const target = prev.find(p => p.id === id);
      if (!target) return prev;

      let stopOthers = false;
      if (!target.isRunning) {
        const otherRunning = prev.some(p => p.id !== id && p.isRunning);
        if (otherRunning) {
          stopOthers = window.confirm('Stop other running timers?');
        }
      }

      return prev.map(p => {
        if (p.id === id) {
          if (p.isRunning && p.startTime) {
            const elapsed = Date.now() - p.startTime;
            return { ...p, isRunning: false, totalTime: p.totalTime + elapsed, startTime: undefined };
          }
          return { ...p, isRunning: true, startTime: Date.now() };
        }
        if (stopOthers && p.isRunning && p.startTime) {
          const elapsed = Date.now() - p.startTime;
          return { ...p, isRunning: false, totalTime: p.totalTime + elapsed, startTime: undefined };
        }
        return p;
      });
    });
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
    <div className="container">
      <h1>Time Tracker</h1>
      <ProjectForm name={name} onNameChange={setName} onAdd={addProject} />
      <ProjectList
        projects={projects}
        now={now}
        formatTime={formatTime}
        onToggle={toggleTimer}
      />
    </div>
  );
}
