export const configureFormElement = (target: HTMLElement) => {
  const internals = target.attachInternals();

  Object.defineProperty(target, 'value', {
    get value() {
      return target.getAttribute('value') as string;
    },
    set value(value: string) {
      target.setAttribute('value', value);
      (internals as any)?.setFormValue(value);
    }
  });

  Object.defineProperty(target, 'error', {
    get value() {
      return (internals as any).validity();
    },
    set value(message: string | undefined) {
      if (message) {
        (internals as any).setValidity({ customError: true }, message);
      } else {
        (internals as any).setValidity({});
      }
    }
  });
};
