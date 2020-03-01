import axios from 'axios';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import AWS from 'aws-sdk'
import { User } from '../store/auth/auth.reducer';
// import { User } from '../App';

export interface Token {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

export interface TokenError {
  error: string
}

export interface AccessTokenError {
  error: string
}

export function isToken(token: Token | TokenError): token is Token {
  return (token as Token).accessToken !== undefined;
}

export function isUser(user: User | AccessTokenError): user is User {
  return (user as User).email !== undefined;
}

export function getTokenUsingCode(code: string): Observable<Token | TokenError> {

  const data = {
    grant_type: 'authorization_code',
    client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
    code,
    redirect_uri: process.env.REACT_APP_COGNITO_REDIRECT_URL
  };

  const tokenUrl: any = process.env.REACT_APP_COGNITO_TOKEN_URL;

  return from(
    axios
      .post(
        tokenUrl,
        {},
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          params: data
        }
      )).pipe(
        map((res): Token => ({
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
          idToken: res.data.id_token
        })),
        catchError((): Observable<TokenError> => of({ error: 'Failed to get token' }))
      )
}

export function getAccessTokenUsingRefreshToken(refreshToken: string): Observable<Token | TokenError> {
  const data = {
    grant_type: 'refresh_token',
    client_id: process.env.REACT_APP_COGNITO_CLIENT_ID,
    refresh_token: refreshToken
  };


  const tokenUrl: any = process.env.REACT_APP_COGNITO_TOKEN_URL;

  return from(
    axios
      .post(
        tokenUrl,
        {},
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          params: data
        }
      )).pipe(
        map((res): Token => ({
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
          idToken: res.data.id_token
        })),
        catchError((): Observable<TokenError> => of({ error: 'Failed to refresh access token' }))
      )
}

export function getUserDataFromAccessToken(accessToken: string): Promise<User | AccessTokenError> {
  AWS.config.region = 'us-east-1';
  const cisp = new AWS.CognitoIdentityServiceProvider()

  return new Promise<User | AccessTokenError>((resolve, reject) => {
    cisp.getUser({ AccessToken: accessToken }, (err, data) => {
      if (!err) {
        const user: any = data.UserAttributes.reduce((acc, c) => ({ ...acc, [c.Name]: c.Value }), {})
        resolve({
          id: user.sub,
          verified: user.email_verified,
          email: user.email
        })
      } else {
        reject({ error: 'Error getting user data from access token' })
      }
    })
  });
}
