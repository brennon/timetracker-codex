import React from 'react';

interface Props {
  name: string;
  onNameChange: (name: string) => void;
  onAdd: () => void;
}

export default function ProjectForm({ name, onNameChange, onAdd }: Props) {
  return (
    <div className="project-form d-flex gap-2 mb-3">
      <input
        className="form-control"
        value={name}
        onChange={e => onNameChange(e.target.value)}
        placeholder="Project name"
      />
      <button className="btn btn-primary" onClick={onAdd}>
        Add Project
      </button>
    </div>
  );
}
