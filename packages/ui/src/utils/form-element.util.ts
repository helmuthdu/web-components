/**
 * configures a custom form element to behave like a native input.
 * supports `value` binding, form association, and validation.
 *
 * @param target - The target form-associated element.
 */
export const configureFormElement = (
  target: HTMLElement & {
    checked?: boolean;
    error?: string;
    setCustomValidity?: (message: string) => void;
    value?: any;
  },
) => {
  const internals = target.attachInternals?.();

  if (!internals) {
    return console.warn('attachInternals is not supported in this environment.');
  }

  const isCheckable = /checkbox|radio/.test(target.getAttribute('type') || target.getAttribute('role') || '');

  const sync = () => {
    const { checked, value } = target as any;

    internals.setFormValue(isCheckable ? (checked ? value || 'on' : '') : value == null ? '' : String(value));
  };

  const defineProp = (prop: string, get: () => any, set: (v: any) => void) => {
    const descriptor = Object.getOwnPropertyDescriptor(target, prop);

    Object.defineProperty(target, prop, {
      configurable: true,
      enumerable: true,
      get: descriptor?.get || get,
      set: (v: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        descriptor?.set ? descriptor.set.call(target, v) : set(v);
        sync();
      },
    });
  };

  defineProp(
    'value',
    () => target.getAttribute('value') || '',
    (v) => target.setAttribute('value', v == null ? '' : String(v)),
  );

  if (isCheckable) {
    defineProp(
      'checked',
      () => target.hasAttribute('checked'),
      (v) => (v ? target.setAttribute('checked', '') : target.removeAttribute('checked')),
    );
  }

  if (!Object.getOwnPropertyDescriptor(target, 'error')) {
    Object.defineProperty(target, 'error', {
      configurable: true,
      get: () => internals.validationMessage,
    });
  }

  target.setCustomValidity = (message: string) => {
    internals.setValidity(message ? { customError: true } : {}, message, target);
    internals.reportValidity();
  };

  target.addEventListener('input', () => {
    const invalid = target.hasAttribute('required') && (isCheckable ? !target.checked : !target.value);

    target.setCustomValidity?.(invalid ? 'This field is required.' : '');
  });

  sync();
};

/**
 * creates a submit event handler that collects form data into an object.
 *
 * @template T - The expected data type.
 * @param handler - A function that processes the form data.
 * @param transformer
 * @returns An event handler function for form submission.
 */
export const createSubmitFormEvent =
  <T>(handler: (data: T) => void, transformer?: (data: FormData) => T) =>
  (event: SubmitEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    if (!form.checkValidity()) {
      return form.reportValidity();
    }

    const formData = new FormData(form);

    handler(transformer ? transformer(formData) : (Object.fromEntries(formData) as any));
  };
