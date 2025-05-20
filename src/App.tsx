import React, { useEffect, useState } from 'react';
import { confirm as showConfirm, prompt as showPrompt } from './utils/dialog';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import { Project } from './components/ProjectItem';
import './App.css';

const loadProjects = (): Project[] => {
  if (typeof localStorage === 'undefined') {
    return [];
  }
  const data = localStorage.getItem('projects');
  return data
    ? (JSON.parse(data) as Project[]).map(p => ({
        ...p,
        activities: p.activities || [],
      }))
    : [];
};

const saveProjects = (projects: Project[]) => {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem('projects', JSON.stringify(projects));
};

const stopProjectTimer = async (project: Project): Promise<Project> => {
  if (!project.startTime)
    return { ...project, isRunning: false, startTime: undefined };
  const elapsed = Date.now() - project.startTime;
  const last = project.activities[project.activities.length - 1];
  let description = '';
  if (last) {
    const cont = await showConfirm(
      `Project "${project.name}" last activity was "${last.description}". Continue?`
    );
    if (cont) {
      description = last.description;
    } else {
      const input = await showPrompt(`Describe work done on "${project.name}"`);
      description = input || 'Unspecified';
    }
  } else {
    const input = await showPrompt(`Describe work done on "${project.name}"`);
    description = input || 'Unspecified';
  }
  return {
    ...project,
    isRunning: false,
    startTime: undefined,
    activities: [...project.activities, { description, duration: elapsed }],
  };
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
      { id: Date.now(), name, isRunning: false, activities: [] },
    ]);
    setName('');
  };

  const toggleTimer = async (id: number) => {
    const target = projects.find(p => p.id === id);
    if (!target) return;

    let stopOthers = false;
    if (!target.isRunning) {
      const otherRunning = projects.some(p => p.id !== id && p.isRunning);
      if (otherRunning) {
        stopOthers = await showConfirm('Stop other running timers?');
      }
    }

    const updated = [] as Project[];
    for (const p of projects) {
      if (p.id === id) {
        if (p.isRunning && p.startTime) {
          updated.push(await stopProjectTimer(p));
        } else {
          updated.push({ ...p, isRunning: true, startTime: Date.now() });
        }
      } else if (stopOthers && p.isRunning) {
        updated.push(await stopProjectTimer(p));
      } else {
        updated.push(p);
      }
    }
    setProjects(updated);
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
    <div className="app-container container mt-4">
      <h1 className="text-center">Time Tracker</h1>
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
