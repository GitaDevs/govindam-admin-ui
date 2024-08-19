const API_PREFIX = "api"

export const API_ENDPOINTS = {
  // user requests
  USER_AUTH: `${API_PREFIX}/auth/local`,
  USER_FORGOT_PSWD: `${API_PREFIX}/auth/forgot-password`,
  USER_RESET_PSWD: `${API_PREFIX}/auth/reset-password`,
  USER_ME: `${API_PREFIX}/users/me`,
  USER_REGISTER: `${API_PREFIX}/auth/local/register`,
  USER_SUBS: `${API_PREFIX}/user-subs`,
  SUBS: `${API_PREFIX}/subscriptions`,
  SUB_PURCHASE_VALIDATE: `${API_PREFIX}/user-subs/validate`,

  // menu & meals request
  MENUS: `${API_PREFIX}/menus`,

  // raw items
  RAW_ITEMS: `${API_PREFIX}/raw-items`,

  // special orders
  SPECIAL_ORDERS: `${API_PREFIX}/special-order`,

  // inventory alert
  INVENTORY_ALERT: `${API_PREFIX}/inventory-alerts`,

  // ratings
  RATINGS: `${API_PREFIX}/ratings`,
}