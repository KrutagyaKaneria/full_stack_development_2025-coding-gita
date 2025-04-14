import React from "react";
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import './index.css'

const domain = "dev-q0qgaj8q4u4b5f0u.us.auth0.com";
const clientId = "XAKAL2gOzi4UXsmayuRYoNYIc8RSQHua";

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
