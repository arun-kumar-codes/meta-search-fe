export const endpoints = {
  // Search endpoints
  search: '/search',
  // Car details endpoint
  carDetails: (id: string) => `/search/${id}`,
}

export default endpoints
