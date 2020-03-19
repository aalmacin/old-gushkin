const GUSHKIN_TOKENS = 'gushkinTokens';

export type Token = {
  accessToken: string,
  idToken: string,
  expireTime: number,
  refreshToken: string
}

export const getTokens = () => {
  const tokens = localStorage.getItem(GUSHKIN_TOKENS);
  return tokens ? JSON.parse(tokens) : null;
}

export const removeTokens = () => {
  localStorage.removeItem(GUSHKIN_TOKENS)
}

export const addToken = (token: Token) => {
  removeTokens();
  localStorage.setItem(GUSHKIN_TOKENS, JSON.stringify(token))
}