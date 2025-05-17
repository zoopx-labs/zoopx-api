// File: modules/add-backend-secret-header.ts
import { ZuploRequest, ZuploContext, environment } from "@zuplo/runtime";

export default async function (request: ZuploRequest, context: ZuploContext) {
  // Read the shared secret from Zuplo's environment variables
  const secret = environment.BACKEND_SHARED_SECRET; // This should be 'april-secret-2025'

  if (!secret) {
    context.log.error("CRITICAL: BACKEND_SHARED_SECRET is not set in Zuplo environment variables. Request will not be trusted by backend.");
    // Depending on your security posture, you might want to return an error from Zuplo here
    // return new Response("Gateway configuration error", { status: 500 });
  } else {
    // Add the secret to a custom header.
    // Your backend service will look for this header and this secret value.
    request.headers.set("X-Zuplo-To-Backend-Secret", secret);
    context.log.info("Added X-Zuplo-To-Backend-Secret header to outbound request.");
  }

  // Return the modified request to continue down the policy pipeline
  // or to the route handler.
  return request;
}