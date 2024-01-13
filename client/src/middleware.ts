import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readPayloadJose } from './lib/jwt';

export const middleware = async (request: NextRequest) => {
  // Middleware 1
  // if (
  //   !request.url.includes('/api') &&
  //   !request.url.includes('_next/static') &&
  //   !request.url.includes('_next/image') &&
  //   !request.url.includes('favicon.ico')
  // ) {
  //   console.log(request.method, request.url);
  // }
  // End of Logic Middleware 1


  // Middleware 2
  if (request.url.includes('/api') && !request.url.includes('/api/user') && !request.url.includes('/api/product') && request.method !== 'POST' ) {
    console.log('API', request.method, request.url);

    const cookiesStore = cookies();

    
    const token = cookiesStore.get('token');

    console.log('token>>>>>>', token);

    //validation
    if (!token) {
      return NextResponse.json({
        statusCode: 401,
        error: 'Unauthorized'
      });
    }

    const tokenData = await readPayloadJose<{ id: string; email: string }>(
      token.value
    );

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set('x-user-id', tokenData.id);
    requestHeaders.set('x-user-email', tokenData.email);
    // requestHeaders.set("x-custom-value", "for aditional cus-value");

    return NextResponse.next({
      headers: requestHeaders
    });
  }
  // End of Logic Middleware 2

  return NextResponse.next();
};
