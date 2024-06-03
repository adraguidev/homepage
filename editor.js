document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('jsonInput');
    const saveButton = document.getElementById('saveButton');
    const modal = document.getElementById('masterKeyModal');
    const closeModal = document.querySelector('.modal__close');
    const verifyKeyButton = document.getElementById('verifyKeyButton');
    const masterKeyInput = document.getElementById('masterKeyInput');

    // Clave maestra para verificar
    const MASTER_KEY = 'Ka260314!';

    // Cargar el JSON almacenado en el localStorage
    const storedJson = localStorage.getItem('resumeData');
    if (storedJson) {
        jsonInput.value = storedJson;
    } else {
        fetch('datos.json')
            .then(response => response.json())
            .then(data => {
                jsonInput.value = JSON.stringify(data, null, 2);
            })
            .catch(error => console.error('Error:', error));
    }

    // Mostrar el modal para ingresar la clave maestra
    saveButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Cerrar el modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Verificar la clave maestra
    verifyKeyButton.addEventListener('click', () => {
        const enteredKey = masterKeyInput.value;
        if (enteredKey === MASTER_KEY) {
            const updatedJson = jsonInput.value;
            try {
                JSON.parse(updatedJson); // Validar formato JSON
                localStorage.setItem('resumeData', updatedJson);
                alert('JSON saved successfully');
                modal.style.display = 'none';
            } catch (error) {
                alert('Invalid JSON format');
            }
        } else {
            alert('Incorrect master key');
        }
    });

    // Cerrar el modal cuando se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

