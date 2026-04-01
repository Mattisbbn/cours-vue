const apiBaseUrl = import.meta.env.VITE_API_URL

export const apiFetch = async (endpoint, options = {}) => {
  if (!apiBaseUrl) {
    throw new Error('VITE_API_URL is not defined in front/.env')
  }

  return fetch(`${apiBaseUrl}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })
}
