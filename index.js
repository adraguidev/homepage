document.addEventListener('DOMContentLoaded', () => {
    const storedJson = localStorage.getItem('resumeData');
    if (storedJson) {
        const data = JSON.parse(storedJson);
        populateResume(data);
    } else {
        fetch('datos.json')
            .then(response => response.json())
            .then(data => {
                populateResume(data);
            })
            .catch(error => console.error('Error:', error));
    }
});

function populateResume(data) {
    document.querySelector('.status').innerText = data.status;
    document.querySelector('.name').innerText = data.name;
    document.querySelector('.title').innerText = data.title;
    // Continúa populando los demás campos según tu estructura de datos
}
