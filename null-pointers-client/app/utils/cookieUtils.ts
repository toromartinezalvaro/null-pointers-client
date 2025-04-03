export function getTokenFromCookiesClient(): string | null {
  const cookieHeader = document.cookie;
  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  return tokenMatch ? tokenMatch[1] : null;
}

export function getTokenFromCookiesServer(request: Request): string | null {
  const cookieHeader = request.headers.get('Cookie');

  if (!cookieHeader) {
    console.error("No cookies found in request");
    return null;
  }
  
  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  if (!token) {
    console.error("Token not found in cookies");
    return null;
  }

  return token;
}
