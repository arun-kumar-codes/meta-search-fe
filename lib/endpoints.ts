export const endpoints = {
  search: '/search',
  carDetails: (id: string) => `/search/listings/${id}`,
  brands: '/search/brands',
  models: '/search/models',
  cities: '/search/cities',
  states: '/search/states',
  bodyTypes: '/search/body-types',
}

export default endpoints
