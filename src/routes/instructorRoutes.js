const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /rutinas - crear rutina para un paciente
router.post('/rutinas', async (req, res) => {
    try {
        const { pacienteId, nombre, tipoTerapiaId, sesionesRecom, posturas } = req.body;

        if (!pacienteId || !nombre || !tipoTerapiaId || !posturas || posturas.length < 6) {
            return res.status(400).json({ error: 'Faltan datos o menos de 6 posturas' });
        }

        // Validar que paciente pertenece al instructor autenticado
        const paciente = await prisma.paciente.findUnique({ where: { id: pacienteId } });
        if (!paciente || paciente.instructorId !== req.instructorId) {
            return res.status(403).json({ error: 'No autorizado para crear rutina para este paciente' });
        }

        // Crear la serie (rutina)
        const rutina = await prisma.serie.create({
            data: {
                nombre,
                tipoTerapiaId,
                sesionesRecom,
                seriesDetalle: {
                    create: posturas.map(p => ({
                        posturaId: p.posturaId,
                        orden: p.orden,
                        duracion: p.duracion,
                    })),
                },
            },
            include: { seriesDetalle: true },
        });

        // Asignar la rutina creada al paciente (upsert)
        await prisma.seriePaciente.upsert({
            where: { pacienteId },
            update: { serieId: rutina.id, activa: true, sesionesCompletadas: 0 },
            create: { pacienteId, serieId: rutina.id, activa: true, sesionesCompletadas: 0 },
        });

        res.status(201).json(rutina);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /posturas - listar todas las posturas
router.get('/posturas', async (req, res) => {
    try {
        const posturas = await prisma.postura.findMany({
            select: {
                id: true,
                nombreEsp: true,
                nombreSanskrit: true,
                fotoUrl: true,
                videoUrl: true,
                instrucciones: true,
                beneficios: true,
                modificaciones: true,
            }
        });
        res.json(posturas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
