import * as sessionService from "../services/sessionService.js";

export const createSessionController = async (req, res) => {
  try {
    const { patientSeriesId, painBeforeId, startedAt } = req.body;
    
    if (!patientSeriesId || !painBeforeId || !startedAt) {
      return res.status(400).json({ 
        success: false, 
        message: "Faltan campos obligatorios" 
      });
    }

    const newSession = await sessionService.createSession({ 
      patientSeriesId, 
      painBeforeId, 
      startedAt 
    });
    
    res.json({ 
      success: true, 
      sessionId: newSession.id 
    });
    
  } catch (error) {
    console.error('Error en createSessionController:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updateSessionController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { painAfterId, comment, endedAt, pauses, effectiveMinutes } = req.body;
    
    if (!painAfterId || !comment || !endedAt) {
      return res.status(400).json({ 
        success: false, 
        message: "Faltan campos obligatorios" 
      });
    }

    const { updatedSession, sessionsCompleted } = await sessionService.updateSession(
      id, 
      { painAfterId, comment, endedAt, pauses, effectiveMinutes }
    );

    res.json({ 
      success: true, 
      sessionId: updatedSession.id,
      sessionsCompleted 
    });
    
  } catch (error) {
    console.error('Error en updateSessionController:', error);
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};