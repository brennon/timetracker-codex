import React, { useEffect, useState } from 'react';
import { setDialogImpl } from '../utils/dialog';

interface ConfirmState {
  type: 'confirm';
  message: string;
  resolve: (value: boolean) => void;
}

interface PromptState {
  type: 'prompt';
  message: string;
  resolve: (value: string | null) => void;
}

type DialogState = ConfirmState | PromptState | null;

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DialogState>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    setDialogImpl({
      confirm: (msg: string) =>
        new Promise<boolean>(resolve => setState({ type: 'confirm', message: msg, resolve })),
      prompt: (msg: string) =>
        new Promise<string | null>(resolve => {
          setInput('');
          setState({ type: 'prompt', message: msg, resolve });
        }),
    });
  }, []);

  const handleConfirm = (value: boolean) => {
    if (state && state.type === 'confirm') {
      state.resolve(value);
      setState(null);
    }
  };

  const handlePrompt = (value: string | null) => {
    if (state && state.type === 'prompt') {
      state.resolve(value);
      setState(null);
    }
  };

  return (
    <>
      {children}
      {state && state.type === 'confirm' && (
        <div className="modal-overlay">
          <div className="modal-dialog bg-white p-3 rounded">
            <p>{state.message}</p>
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-primary" onClick={() => handleConfirm(true)}>OK</button>
              <button className="btn btn-secondary" onClick={() => handleConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {state && state.type === 'prompt' && (
        <div className="modal-overlay">
          <div className="modal-dialog bg-white p-3 rounded">
            <p>{state.message}</p>
            <input
              className="form-control mb-2"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-primary" onClick={() => handlePrompt(input)}>OK</button>
              <button className="btn btn-secondary" onClick={() => handlePrompt(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
