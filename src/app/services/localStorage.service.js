const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USER_ID = "user-id";

export function setTokens({
  refreshToken,
  idToken,
  localId,
  expiresIn = 3600,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
  localStorage.setItem(USER_ID, localId);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
  return localStorage.getItem(USER_ID);
}

export function removeTokens() {
  if (getAccessToken()) {
    localStorage.removeItem(TOKEN_KEY);
  }
  if (getRefreshToken()) {
    localStorage.removeItem(REFRESH_KEY);
  }
  if (getTokenExpiresDate()) {
    localStorage.removeItem(EXPIRES_KEY);
  }
  if (getUserId()) {
    localStorage.removeItem(USER_ID);
  }
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeTokens,
};
export default localStorageService;
