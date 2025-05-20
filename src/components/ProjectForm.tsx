import React from 'react';

interface Props {
  name: string;
  onNameChange: (name: string) => void;
  onAdd: () => void;
}

export default function ProjectForm({ name, onNameChange, onAdd }: Props) {
  return (
    <div className="project-form">
      <input
        value={name}
        onChange={e => onNameChange(e.target.value)}
        placeholder="Project name"
      />
      <button onClick={onAdd}>Add Project</button>
    </div>
  );
}
