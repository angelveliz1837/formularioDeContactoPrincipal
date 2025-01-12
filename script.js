document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formulario");

    // Función para mostrar el mensaje de éxito y recargar la página
    function mostrarExito() {
        const aceptadoSection = document.querySelector(".aceptado");
        if (aceptadoSection) {
            aceptadoSection.classList.remove("hidden"); // Eliminar la clase hidden para mostrar el mensaje

            // Desplazar la página hacia la sección ".aceptado"
            aceptadoSection.scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave

            // Esperar 2 segundos y luego actualizar la página
            setTimeout(() => {
                location.reload(); // Recargar la página
            }, 2000); // 2 segundos
        }
    }

    // Función para validar los campos de entrada
    function validarCampos() {
        let isValid = true;
        let firstErrorField = null;

        form.querySelectorAll("input, textarea").forEach((field) => {
            const errorMessage = field.parentElement.querySelector(".error-message");

            if (field.type === "radio" || field.type === "checkbox") {
                // Validación para campos de tipo radio y checkbox
                const checked = form.querySelector(`input[name="${field.name}"]:checked`);
                if (!checked) {
                    isValid = false;
                    if (!firstErrorField) firstErrorField = field;
                    mostrarError(field, errorMessage);
                } else {
                    ocultarError(field, errorMessage);
                }
            } else {
                // Validación para campos de texto (input y textarea)
                if (!field.value.trim()) {
                    isValid = false;
                    if (!firstErrorField) firstErrorField = field; 
                    mostrarError(field, errorMessage);
                } else {
                    ocultarError(field, errorMessage);
                }
            }
        });
        if (firstErrorField) {
            firstErrorField.focus();
        }

        return isValid;
    }

    // Función para validar el tipo de consulta (radio buttons)
    function validarTipoConsulta() {
        const queryTypeRadio = form.querySelectorAll('input[name="radio"]');
        const queryTypeErrorMessage = form.querySelector('.error-message.query-type');
        const isQueryTypeSelected = Array.from(queryTypeRadio).some(radio => radio.checked);

        if (!isQueryTypeSelected) {
            mostrarError(null, queryTypeErrorMessage);
            return false;
        } else {
            ocultarError(null, queryTypeErrorMessage);
            return true;
        }
    }

    // Función para validar el campo de correo
    function validarCorreo() {
        const emailField = form.querySelector('input[name="correo"]');
        const emailErrorMessage = emailField.parentElement.querySelector(".error-message");
        const emailValue = emailField.value.trim();

        if (!emailValue) {
            emailErrorMessage.textContent = "This field is required";
            mostrarError(emailField, emailErrorMessage);
            return false;
        } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
            emailErrorMessage.textContent = "Please enter a valid email";
            mostrarError(emailField, emailErrorMessage);
            return false;
        } else {
            ocultarError(emailField, emailErrorMessage);
            return true;
        }
    }

    // Función para mostrar el mensaje de error
    function mostrarError(field, errorMessage) {
        if (field) {
            field.classList.add("error");
            setTimeout(() => {
                field.focus();
            }, 0);
        }
        if (errorMessage) {
            errorMessage.style.display = "block";
        }
    }

    // Función para ocultar el mensaje de error
    function ocultarError(field, errorMessage) {
        if (field) {
            field.classList.remove("error");
        }
        if (errorMessage) {
            errorMessage.style.display = "none";
        }
    }

    // Función para validar el consentimiento
    function validarConsentimiento() {
        const consentCheckbox = form.querySelector('input[type="checkbox"]');
        const consentErrorMessage = form.querySelector('.error-message.consent'); // Mensaje de error del checkbox

        if (!consentCheckbox.checked) {
            mostrarError(consentCheckbox, consentErrorMessage);
            return false;
        } else {
            ocultarError(consentCheckbox, consentErrorMessage);
            return true;
        }
    }

    // Función para manejar el envío del formulario
    function manejarEnvioFormulario(event) {
        event.preventDefault();

        const isCamposValidos = validarCampos();
        const isTipoConsultaValido = validarTipoConsulta();
        const isCorreoValido = validarCorreo();
        const isConsentimientoValido = validarConsentimiento();

        if (isCamposValidos && isTipoConsultaValido && isCorreoValido && isConsentimientoValido) {
            console.log("Formulario enviado exitosamente.");
            mostrarExito(); // Llamar a la función para mostrar el mensaje de éxito
        } else {
            console.log("Hay errores en el formulario.");
        }
    }

    // Función para manejar la selección en los grids
    function manejarSeleccionGrid() {
        const gridElements = document.querySelectorAll(".grid");
        gridElements.forEach((grid) => {
            grid.addEventListener("click", () => {
                gridElements.forEach((g) => {
                    g.classList.remove("selected");
                    const img = g.querySelector(".selection-icon");
                    img?.remove();
                });

                grid.classList.add("selected");

                const radio = grid.querySelector("input[type='radio']");
                const checkbox = grid.querySelector("input[type='checkbox']");

                if (radio) radio.checked = true;
                if (checkbox) checkbox.checked = true;

                const imgSrc = radio
                    ? "assets/images/icon-radio-selected.svg"
                    : checkbox
                    ? "assets/images/icon-checkbox-check.svg"
                    : null;

                if (imgSrc) {
                    const img = document.createElement("img");
                    img.src = imgSrc;
                    img.alt = "check";
                    img.className = "selection-icon";
                    grid.appendChild(img);
                }
            });
        });
    }

    // Función para manejar el cambio en el checkbox de consentimiento
    function manejarCambioConsentimiento() {
        const consentBox = document.querySelector(".caja.confirmar");

        if (consentBox) {
            const checkbox = consentBox.querySelector('input[type="checkbox"]');
            const icon = consentBox.querySelector("img");

            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    icon.style.display = "inline";
                } else {
                    icon.style.display = "none";
                }
            });
        }
    }

    // Asociar los eventos
    form.addEventListener("submit", manejarEnvioFormulario);
    manejarSeleccionGrid();
    manejarCambioConsentimiento();
});
