import { useCallback } from 'react';

export const useAuth = () => {
  const isAuthenticated = useCallback(() => {
    const token = localStorage.getItem('tokennn');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isValid = payload.exp * 1000 > Date.now();
      
      if (!isValid) {
        localStorage.removeItem('tokennn');
        return false;
      }
      
      return true;
    } catch (error) {
      console.warn('Invalid token format:', error);
      localStorage.removeItem('tokennn');
      return false;
    }
  }, []);

  return { isAuthenticated };
};