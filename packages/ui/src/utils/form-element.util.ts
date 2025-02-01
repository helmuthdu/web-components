/**
 * configures a custom form element to behave like a native input.
 * supports `value` binding, form association, and validation.
 *
 * @param target - The target form-associated element.
 */
export const configureFormElement = (target: HTMLInputElement & { error?: string; value?: string }) => {
  if (!target.attachInternals) {
    console.warn('attachInternals is not supported in this environment.');

    return;
  }

  const internals = target.attachInternals();

  // Define "value" property with form association
  Object.defineProperty(target, 'value', {
    get() {
      return target.getAttribute('value') || '';
    },
    set(value: string) {
      target.setAttribute('value', value);
      internals.setFormValue(value);
    },
  });

  // Define "error" property for validation feedback
  Object.defineProperty(target, 'error', {
    get() {
      return internals.validationMessage;
    },
  });

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
    if (target.hasAttribute('required') && !target.value) {
      target.setCustomValidity('This field is required.');
    } else {
      target.setCustomValidity('');
    }
  });

  // support for checkboxes and radio buttons
  if (target instanceof HTMLInputElement && (target.type === 'checkbox' || target.type === 'radio')) {
    Object.defineProperty(target, 'checked', {
      get() {
        return target.hasAttribute('checked');
      },
      set(value: boolean) {
        if (value) {
          target.setAttribute('checked', '');
        } else {
          target.removeAttribute('checked');
        }

        internals.setFormValue(value ? target.value || 'on' : '');
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
