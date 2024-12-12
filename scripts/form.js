class FormControl {
    #controlRef;
    #initialValue;

    constructor(selector, initialValue) {
        this.#controlRef = document.querySelector(selector);
        this.#initialValue = initialValue;

        this.writeValue();
    }

    get value() {
        return this.#controlRef.value;
    }

    get control() {
        return this.#controlRef;
    }

    writeValue() {
        this.control.value = this.#initialValue;
    }

    clear() {
        this.control.value = '';
    }

    isEmpty() {
        return this.value.trim() === '';
    }
}

class Form {
    #formRef;
    #formControlsRefs;
    #submitAction;
    #errorDisplayRef;

    constructor(selector, submitAction, errorDisplayRef) {
        this.#formRef = document.querySelector(selector);
        this.#formControlsRefs = [...this.#formRef.querySelectorAll('input, select')].map(control =>
            new FormControl(`#${control.id}`, '')
        );
        this.#submitAction = submitAction;
        this.#errorDisplayRef = errorDisplayRef;

        this.#addSubmitListener();
    }

    #addSubmitListener() {
        this.#formRef.addEventListener('submit', (event) => this.#handleFormSubmit(event));
    }

    #handleFormSubmit(event) {
        event.preventDefault();

        if (this.#areInputsValid()) {
            const data = this.#collectData();
            if (this.#isDataUnique(data)) {
                this.#clearError();
                this.#submitAction(data);
                this.#clearForm();
            } else {
                this.#setError('The row must be unique!');
            }
        }
    }

    #areInputsValid() {
        const invalidControls = this.#formControlsRefs.filter(control => control.isEmpty());
        if (invalidControls.length > 0) {
            this.#setError('All fields are required!');
            return false;
        }
        return true;
    }

    #collectData() {
        return this.#formControlsRefs.reduce((acc, control) => {
            acc[control.control.name] = control.value;
            return acc;
        }, { id: new Date().getTime() });
    }

    #isDataUnique(data) {
        return !table.isDuplicateRow(data);
    }

    #setError(errorMessage) {
        this.#errorDisplayRef.textContent = errorMessage;
    }

    #clearError() {
        this.#errorDisplayRef.textContent = '';
    }

    #clearForm() {
        this.#formControlsRefs.forEach(control => control.clear());
    }
}