const STORAGE_KEY = 'yes-no-app-responses';

export const saveResponses = (responses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
    return true;
  } catch (error) {
    console.error('Error guardando respuestas:', error);
    return false;
  }
};

export const loadResponses = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error cargando respuestas:', error);
    return {};
  }
};

export const clearResponses = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error limpiando respuestas:', error);
    return false;
  }
};

export const getResponseCount = () => {
  const responses = loadResponses();
  return Object.keys(responses).length;
};