// src/hooks/usePlanillaCalificaciones.js

import { useState, useEffect } from 'react';
import { getPlanillaCalificaciones } from '../api/api';

export const usePlanillaCalificaciones = (materiaId, periodoId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!materiaId || !periodoId) {
      setData([]);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        // Usamos la función centralizada de api.js
        const response = await getPlanillaCalificaciones(materiaId, periodoId);
        setData(response.data);
      } catch (err) {
        console.error('Error cargando planilla:', err);
        setError(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [materiaId, periodoId]);

  return { data, loading, error };
};