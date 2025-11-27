// API base URL configuration
export const getApiBaseUrl = () => {
  // In production, use the VITE_API_URL environment variable
  // In development, use the proxy (empty string means relative URL)
  if (import.meta.env.MODE === 'production' && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  return ''; // Use relative URLs for development (proxy handles it)
};

export const apiUrl = (path) => {
  const base = getApiBaseUrl();
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};
