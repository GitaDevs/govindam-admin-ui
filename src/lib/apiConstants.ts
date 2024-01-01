const API_PREFIX = "api"

export const API_ENDPOINTS = {
  // user requests
  USER_AUTH: `${API_PREFIX}/auth/local`,
  USER_ME: `${API_PREFIX}/users/me`,
  USER_REGISTER: `${API_PREFIX}/auth/local/register`,

  // menu & meals request
  MENUS: `${API_PREFIX}/menus`,

  // raw items
  RAW_ITEMS: `${API_PREFIX}/raw-items`,

  // special orders
  SPECIAL_ORDERS: `${API_PREFIX}/special-order`
}