export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // Retrieve the backend URL from Cloudflare environment variables
  // Cloudflare Pages exposes environment variables under context.env
  const backendBase = context.env.VITE_BACKEND_URL || context.env.BACKEND_URL;
  
  if (!backendBase) {
    return new Response(
      JSON.stringify({ 
        error: "VITE_BACKEND_URL is not configured in Cloudflare Pages dashboard.",
        tip: "Please go to Pages > Settings > Environment variables and add VITE_BACKEND_URL with your Alwaysdata backend URL."
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json" 
        } 
      }
    );
  }
  
  // Construct the target URL (e.g., https://backend.alwaysdata.net/api/auth/login)
  const targetUrl = `${backendBase.replace(/\/$/, '')}${url.pathname}${url.search}`;
  
  try {
    // Clone the request with the new target URL to preserve headers, body, and method
    const proxyRequest = new Request(targetUrl, context.request);
    
    // Fetch the response from the Alwaysdata backend
    const response = await fetch(proxyRequest);
    
    // Return the response to the client
    return response;
  } catch (err) {
    return new Response(
      JSON.stringify({ 
        error: "Failed to proxy request to backend", 
        details: err.message 
      }),
      { 
        status: 502, 
        headers: { 
          "Content-Type": "application/json" 
        } 
      }
    );
  }
}
