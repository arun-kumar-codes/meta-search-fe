export const endpoints = {
  search: '/search',
  carDetails: (id: string) => `/search/listings/${id}`,
  listingsByIds: (ids: string[]) => `/search/listings?ids=${ids.join(',')}`,
  brands: '/search/brands',
  models: '/search/models',
  cities: '/search/cities',
  states: '/search/states',
  bodyTypes: '/search/body-types',
  // User auth (consumer)
  userSendOtp: '/auth/user/send-otp',
  userVerifyOtp: '/auth/user/verify-otp',
  // User history, wishlist, preferences
  userHistory: '/users/me/history',
  userWishlist: '/users/me/wishlist',
  userWishlistCheck: (listingId: string) => `/users/me/wishlist/${listingId}/check`,
  userPreferences: '/users/me/preferences',
}

export default endpoints
