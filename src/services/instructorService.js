import mockData from '../data/mockData2.js';

export const crearRutina = ({ pacienteId, nombre, tipoTerapiaId, sesionesRecom, posturas }, instructorId) => {
    if (!pacienteId || !nombre || !tipoTerapiaId || !posturas || posturas.length < 6) {
        throw new Error('Faltan datos o menos de 6 posturas');
    }

    const paciente = mockData.pacientes.find(p => p.id === pacienteId);
    if (!paciente || paciente.instructorId !== instructorId) {
        throw new Error('No autorizado para crear rutina para este paciente');
    }

    // Simula la creación de la serie
    const nuevaSerie = {
        id: mockData.series.length + 1,
        nombre,
        tipoTerapiaId,
        sesionesRecom,
        seriesDetalle: posturas.map((p, i) => ({
            id: i + 1,
            posturaId: p.posturaId,
            orden: p.orden,
            duracion: p.duracion,
        })),
    };
    mockData.series.push(nuevaSerie);

    // Simula la asignación al paciente (upsert)
    const existing = mockData.seriePacientes.find(sp => sp.pacienteId === pacienteId);
    if (existing) {
        existing.serieId = nuevaSerie.id;
        existing.activa = true;
        existing.sesionesCompletadas = 0;
    } else {
        mockData.seriePacientes.push({
            pacienteId,
            serieId: nuevaSerie.id,
            activa: true,
            sesionesCompletadas: 0,
        });
    }

    return nuevaSerie;
};

// Obtener todas las posturas desde mockData
export const obtenerPosturas = () => {
    return mockData.postures;
};

