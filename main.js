const form =document.getElementById('formRegister');
const inputAlumno =document.getElementById('inputAlumno');
const inputGrado =document.getElementById('inputGrado');
const inputGrupo =document.getElementById('inputGrupo');
const inputCalificacion =document.getElementById('inputCalificacion');
const tableBody =document.getElementById('tableBody');

let data = JSON.parse(localStorage.getItem("formData")) || [];

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const alumno = inputAlumno.value;
    const grado = inputGrado.value;
    const grupo = inputGrupo.value;
    const calificacion = inputCalificacion.value;

    if (alumno && grado && grupo && calificacion) {
        const newData = {alumno,grado,grupo,calificacion};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    }
})

function saveDataToLocalStorage() {
    localStorage.setItem("formData",JSON.stringify(data))
}

function renderTable() {
    tableBody.innerHTML = '';

    data.forEach(function(item, index){
        const row = document.createElement('tr');
        const alumnoCell = document.createElement('td');
        const gradoCell = document.createElement('td');
        const grupoCell = document.createElement('td');
        const calificacionCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        alumnoCell.textContent = item.alumno;
        gradoCell.textContent = item.grado;
        grupoCell.textContent = item.grupo;
        calificacionCell.textContent = item.calificacion;
        editButton.textContent = "Editar";
        deleteButton.textContent = "Eliminar";

        editButton.addEventListener('click', function(){
            editData(index);
        })
        deleteButton.addEventListener('click', function(){
            deleteData(index);
        })

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(alumnoCell);
        row.appendChild(gradoCell);
        row.appendChild(grupoCell);
        row.appendChild(calificacionCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    })
}

function editData(index){
    const item = data[index]
    inputAlumno.value = item.alumno;
    inputGrado.value = item.grado;
    inputGrupo.value = item.grupo;
    inputCalificacion.value = item.calificacion;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable()
