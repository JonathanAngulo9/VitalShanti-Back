import mockData from '../data/mockData2.js';

export const getPainOverTime = (idPatient) => {

    const patientSeries = mockData.patientSeries.filter(
        ps => ps.patientId === idPatient
    );

    if (patientSeries.length === 0) {
        return {
            success: false,
            message: "El paciente no tiene series asignadas"
        };
    }

    const seriesIds = patientSeries.map(ps => ps.id);

    const dataSessions = mockData.sessions.filter(
        session => seriesIds.includes(session.patientSeriesId)
    );

    if (dataSessions.length === 0) {
        return {
            success: false,
            message: "El paciente no tiene sesiones registradas"
        };
    }
    const painLevelMap = {};
    mockData.painLevels.forEach(level => {
        painLevelMap[level.id] = level.name;
    });

    const painData = dataSessions.map(session => ({
        fecha: session.startedAt.split('T')[0],
        dolorInicial: session.painBeforeId,
        dolorInicialTexto: painLevelMap[session.painBeforeId],
        dolorFinal: session.painAfterId,
        dolorFinalTexto: painLevelMap[session.painAfterId]
    }));

    return {
        success: true,
        data: painData
    };
};
