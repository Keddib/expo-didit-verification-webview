import axios from 'axios';

global.Buffer = require('buffer').Buffer;


interface TokenResponse {
  access_token: string;
  // Add other token response fields if needed
}

interface SessionResponse {
  url: string;
  // Add other session response fields if needed
}

/**
 * Obtains the client access token by authenticating with the Didit API.
 */
export async function getClientAccessToken(): Promise<string> {
  const clientId = "${clientId}";
  const clientSecret = "${clientSecret}";

  // Combine and Base64 encode the credentials
  const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post<TokenResponse>(
      'https://apx.didit.me/auth/v2/token/',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${encodedCredentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to obtain client access token: ${error.response?.status} ${JSON.stringify(error.response?.data)}`);
    }
    throw error;
  }
}

interface CreateSessionParams {
  features: string;
  callback: string;
  vendorData: string;
  accessToken: string;
}

/**
 * Creates a new verification session using the Didit API.
 */
export async function createSession({
  features,
  callback,
  vendorData,
  accessToken,
}: CreateSessionParams): Promise<SessionResponse> {
  try {
    const response = await axios.post<SessionResponse>(
      'https://verification.didit.me/v1/session/',
      {
        callback,
        features,
        vendor_data: vendorData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create session: ${error.response?.status} ${JSON.stringify(error.response?.data)}`);
    }
    throw error;
  }
}

// Example usage:
export async function initializeVerification() {
  try {
    const clientAccessToken = await getClientAccessToken();

    const sessionData = await createSession({
      features: 'OCR + FACE',
      callback: 'myapp://callback',
      vendorData: 'your-vendor-data',
      accessToken: clientAccessToken,
    });

    return sessionData.url;
  } catch (error) {
    console.error('Error during verification initialization:', error);
    throw error;
  }
}
