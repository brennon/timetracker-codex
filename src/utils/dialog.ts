export type Dialog = {
  confirm: (message: string) => Promise<boolean>;
  prompt: (message: string) => Promise<string | null>;
};

let impl: Dialog = {
  confirm: async (msg: string) => Promise.resolve(window.confirm(msg)),
  prompt: async (msg: string) => Promise.resolve(window.prompt(msg)),
};

export function setDialogImpl(dialog: Dialog) {
  impl = dialog;
}

export function confirm(message: string): Promise<boolean> {
  return impl.confirm(message);
}

export function prompt(message: string): Promise<string | null> {
  return impl.prompt(message);
}
