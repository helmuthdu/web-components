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
  if (!target.attachInternals) {
    console.warn('attachInternals is not supported in this environment.');

    return;
  }

  const internals = target.attachInternals();

  // Define "value" property for form interaction
  const originalValue = Object.getOwnPropertyDescriptor(target, 'value');

  Object.defineProperty(target, 'value', {
    configurable: true,
    get: originalValue?.get || (() => target.getAttribute('value') || ''),
    set: (value: any) => {
      const strValue = value === null || value === undefined ? '' : String(value);

      if (originalValue?.set) {
        originalValue.set.call(target, strValue);
      } else {
        target.setAttribute('value', strValue);
      }

      internals.setFormValue(strValue);
    },
  });

  // Define "error" property for validation feedback
  if (!Object.getOwnPropertyDescriptor(target, 'error')) {
    Object.defineProperty(target, 'error', {
      configurable: true,
      get: () => internals.validationMessage,
    });
  }

  /**
   * allows setting a custom validation message.
   * calling `reportValidity()` will show the message in form validation.
   */
  target.setCustomValidity = (message: string) => {
    internals.setValidity(message ? { customError: true } : {}, message, target);
    internals.reportValidity();
  };

  // ensure value updates trigger validation
  target.addEventListener('input', () => {
    if (target.hasAttribute('required') && !(target as any).value) {
      target.setCustomValidity?.('This field is required.');
    } else {
      target.setCustomValidity?.('');
    }
  });

  // support for checkboxes and radio buttons based on role or type
  const type = target.getAttribute('type');
  const role = target.getAttribute('role');
  const isCheckable = type === 'checkbox' || type === 'radio' || role === 'checkbox' || role === 'radio';

  if (isCheckable) {
    const originalChecked = Object.getOwnPropertyDescriptor(target, 'checked');

    Object.defineProperty(target, 'checked', {
      configurable: true,
      get: originalChecked?.get || (() => target.hasAttribute('checked')),
      set: (value: boolean) => {
        if (originalChecked?.set) {
          originalChecked.set.call(target, value);
        } else if (value) {
          target.setAttribute('checked', '');
        } else {
          target.removeAttribute('checked');
        }

        internals.setFormValue(value ? (target as any).value || 'on' : '');
      },
    });
  }
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
      form.reportValidity();

      return;
    }

    const formData = new FormData(form);
    const parsedData = transformer ? transformer(formData) : (Object.fromEntries(formData) as unknown as T);

    handler(parsedData);
  };
