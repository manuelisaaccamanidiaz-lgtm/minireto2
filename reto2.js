let boton = document.querySelector(".btn")
const notasEstudiantes = [];
const nombres = [];

boton.addEventListener("click",(e)=>{
    e.preventDefault();
    
    let nombre = document.querySelector(".ingreso-nombre");
    let nota1 = document.querySelector(".ingreso-nota1");
    let nota2 = document.querySelector(".ingreso-nota2");
    let nota3 = document.querySelector(".ingreso-nota3");
    
    //llenar todos los espacios
    if (
        nombre.value === "" ||
        nota1.value === "" ||
        nota2.value === "" ||
        nota3.value === ""
    ) {
        alert("Completa todos los campos");
        return;
    }

    //vaidacion de notas
    if (
        nota1.value < 0 || nota1.value > 100 ||
        nota2.value < 0 || nota2.value > 100 ||
        nota3.value < 0 || nota3.value > 100
    ) {
        alert("Notas inválidas (0-100)");
        return;
    }

     //cantidad maxima de estudiantes
    if (nombres.length >= 10) {
        alert("Máximo 10 alumnos");
        return;
    }

    //sube los datos ingresados al objeto
    notasEstudiantes.push([Number(nota1.value),Number(nota2.value),Number(nota3.value)]);
    nombres.push(nombre.value)

    console.log(nombres);
    console.log(notasEstudiantes);

    nombre.value = "";
    nota1.value = "";
    nota2.value = "";
    nota3.value = "";

    }
    
)

    

function promedioEstudiante(indice) {
    let notas = notasEstudiantes[indice];
    let promedio = (notas[0] + notas[1] + notas[2]) / 3
    return promedio.toFixed(2);
}

function promediosCertamenes(){
    let suma = notasEstudiantes.reduce((acum, notas) => {
        acum[0] += notas[0];
        acum[1] += notas[1];
        acum[2] += notas[2];
        return acum;
    }, [0, 0, 0]);

    if (notasEstudiantes.length === 0)
        return null;
    return {
        promedioC1: suma[0] / notasEstudiantes.length,
        promedioC2: suma[1] / notasEstudiantes.length,
        promedioC3: suma[2] / notasEstudiantes.length,
    };
    };

function promedioGeneral() {
    const promedios = promediosCertamenes();

    let promedio = 
            (promedios.promedioC1 +
            promedios.promedioC2 +
            promedios.promedioC3) / 3
    promedio = Number(promedio)
    return promedio.toFixed(2);
}

function contarAprobados() {
    return notasEstudiantes.reduce((contador, notas) => {
        let promedio = (notas[0] + notas[1] + notas[2]) / 3;
        return promedio >= 55 ? contador + 1 : contador;
    }, 0);
}

function obtenerEstudiantesConPromedio() {
    return nombres.map((nombre, i) => {
        let notas = notasEstudiantes[i];
        let promedio = (notas[0] + notas[1] + notas[2]) / 3;

        return {
            nombre: nombre,
            promedio: promedio
        };
    });
}

function ordenarEstudiantes() {
    let estudiantes = obtenerEstudiantesConPromedio();

    estudiantes.sort((a, b) => b.promedio - a.promedio);

    return estudiantes;
}

function mostrarResultados() {
    console.log("se ejecuto mostrarResultar")
    const contenedor = document.getElementById("resultados");

    // 🔹 Título
    const titulo = document.createElement("h2");
    titulo.textContent = "Resultados";
    contenedor.appendChild(titulo);

    // =====================
    // 🔹 1. Alumnos
    // =====================
    const listaAlumnos = document.createElement("ul");

    nombres.forEach((nombre, i) => {
        const li = document.createElement("li");

        let notas = notasEstudiantes[i];
        let promedio = promedioEstudiante(i);

        li.textContent = `${nombre} - Notas: [${notas}] - Promedio: ${promedio}`;
        listaAlumnos.appendChild(li);
    });

    contenedor.appendChild(listaAlumnos);

    // =====================
    // 🔹 2. Promedios curso
    // =====================
    const promedios = promediosCertamenes();
    if (!promedios) {
        alert("No hay datos aún");
        return;
    }

    const pPromedios = document.createElement("p");
    pPromedios.textContent = `
        C1: ${promedios.promedioC1.toFixed(2)}, 
        C2: ${promedios.promedioC2.toFixed(2)}, 
        C3: ${promedios.promedioC3.toFixed(2)}
    `;

    contenedor.appendChild(pPromedios);

    // Promedio general
    const pGeneral = document.createElement("p");

    pGeneral.textContent = `Promedio general: ${promedioGeneral()}`;
    contenedor.appendChild(pGeneral);

    // =====================
    // 🔹 3. Aprobados
    // =====================
    const pAprobados = document.createElement("p");

    let aprobados = contarAprobados();
    let reprobados = nombres.length - aprobados;

    pAprobados.textContent = `Aprobados: ${aprobados} - Reprobados: ${reprobados}`;
    contenedor.appendChild(pAprobados);

    // =====================
    // 🔹 4. Ordenados
    // =====================
    const listaOrdenados = document.createElement("ul");

    let ordenados = ordenarEstudiantes();

    ordenados.forEach(est => {
        const li = document.createElement("li");
        li.textContent = `${est.nombre} - ${est.promedio}`;
        listaOrdenados.appendChild(li);
    });

    contenedor.appendChild(listaOrdenados);

    // =====================
    // 🔹 Mostrar en HTML
    // =====================
    
    document.body.appendChild(contenedor);

    
}

let btnResultados = document.querySelector("#btnResultados");
btnResultados.addEventListener("click",mostrarResultados);