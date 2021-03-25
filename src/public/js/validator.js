// ! Define object `Validator`
const Validator = (options) => {
    var getParent = (element, selector) => {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    };

    var selectorRules = {};

    // TODO : Function to validate
    const validate = (inputElement, rule) => {
        var errorElement = getParent(
            inputElement,
            options.formGroupSelector
        ).querySelector(options.errorSelector);
        var errorMessage;

        // TODO : Take out all rules of selector
        var rules = selectorRules[rule.selector];

        // TODO : Loops through all rules and check
        // TODO : If error => stop checking
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case "radio":
                case "checkbox":
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ":checked")
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerHTML = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add(
                "invalid"
            );
        } else {
            errorElement.innerHTML = "";
            getParent(inputElement, options.formGroupSelector).classList.remove(
                "invalid"
            );
        }
        return !errorMessage;
    };
    // TODO : Take element which need validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function(e) {
            // TODO : prevent when submit form
            e.preventDefault();

            var isFormValid = true;

            //  TODO : loop through each rule and validate
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // TODO : Case submit with JS
                if (typeof options.onSubmit === "function") {
                    var enableInputs = formElement.querySelectorAll("[name]");

                    var formValues = Array.from(enableInputs).reduce(
                        (values, input) => {
                            switch (input.type) {
                                case "radio":
                                    values[
                                        input.name
                                    ] = formElement.querySelector(
                                        'input[name ="' +
                                        input.name +
                                        '"]:checked'
                                    ).value;
                                    break;
                                case "checkbox":
                                    if (!input.matches(":checked")) {
                                        // values[input.name] = '';
                                        return values;
                                    }
                                    if (!Array.isArray(values[input.name])) {
                                        values[input.name] = [];
                                    }
                                    values[input.name].push(input.value);
                                    break;
                                case "file":
                                    values[input.name] = input.files;
                                    break;
                                default:
                                    values[input.name] = input.value;
                            }

                            return values;
                        }, {}
                    );

                    options.onSubmit(formValues);
                }
                // TODO : Case submit with HTML
                else {
                    formElement.submit();
                }
            }
        };

        // TODO : Loop through all rules and process(listen on blur,input,...)
        options.rules.forEach((rule) => {
            // TODO :  Save rules for each input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach((inputElement) => {
                if (inputElement) {
                    // * Case when blur out input
                    inputElement.onblur = () => {
                        validate(inputElement, rule);
                    };
                    // * Case when user input
                    inputElement.oninput = () => {
                        var errorElement = getParent(
                            inputElement,
                            options.formGroupSelector
                        ).querySelector(options.errorSelector);
                        errorElement.innerHTML = "";
                        getParent(
                            inputElement,
                            options.formGroupSelector
                        ).classList.remove("invalid");
                    };
                }
            });
        });
        // console.log(selectorRules);
    }
};
// ! Define rules
// * isRequired rule
// * 1. When error occurs => throw error message
// * 2. When accepted => return no thing <undefined>
Validator.isRequired = (selector, message) => {
    return {
        selector: selector,
        test: (value) => {
            return value ?
                undefined :
                message ?
                message :
                "Please enter your name";
        },
    };
};
Validator.isEmail = (selector, message) => {
    return {
        selector: selector,
        test: (value) => {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ?
                undefined :
                message ?
                message :
                "Wrong email";
        },
    };
};
Validator.minLength = (selector, min, message) => {
    return {
        selector: selector,
        test: (value) => {
            return value.length >= min ?
                undefined :
                message ?
                message :
                "Not enough strong password";
        },
    };
};
Validator.isConfirmed = (selector, getConfirmValue, message) => {
    return {
        selector: selector,
        test: (value) => {
            return value === getConfirmValue() ?
                undefined :
                message ?
                message :
                "Invalid Value";
        },
    };
};