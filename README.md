# React with Keycloak starter

> ## NB: Remember to replace the contents of the `public/keycloak.json` file with your own Keycloak server configuration

## Table of contents

- [Background](#background)
- [Install](#install)
- [Usage](#install)
- [Keycloak Configuration](#keycloak-configuration)
- [Keycloak JavaScript Adapter](#keycloak-javascript-adapter)
- [Axios Interceptor](#axios-interceptor)
- [Custom Hooks](#custom-hooks)
- [Dependencies](#dependencies)
- [Authors](#authors)
- [License](#license)

## Background

This repository provides a starting point for candidates choosing to use React with Keycloak. The

## Install

Using npm

```sh
npm install
# Install the project dependencies
```

## Usage

```sh
npm start
# Start the React server
```

## Keycloak Configuration

After setting up your Keycloak server, you **must** copy the JSON configuration from the Admin panel. Replace the content in the `public/keycloak.json` file before you start.

![Keycloak Config](./keycloak-config.png)

## Keycloak JavaScript Adapter

The [keycloak-js](https://www.npmjs.com/package/keycloak-js) library exposes the [Keycloak JavaScript Adapter](https://github.com/keycloak/keycloak-documentation/blob/main/securing_apps/topics/oidc/javascript-adapter.adoc#javascript-adapter-reference) which provides properties and methods to manage the existing Keycloak session on the client. Follow the link to the [Keycloak documentation](https://github.com/keycloak/keycloak-documentation/blob/main/securing_apps/topics/oidc/javascript-adapter.adoc#javascript-adapter-reference) for more detail on the Adapter API.

## Keycloak - Protected Routes (Roles)

Keycloak provides the ability to setup roles for users. The KeycloakRoute Higher Order Component.

```jsx
/* File: src/App.jsx
 * Add a Protected Route using React Router 6.x */
<Routes>
    <Routes path="/profile" 
        element={ 
            <KeycloakRoute role="USER">
                <ProfilePage />
            </KeycloakRoute> 
        }
    />
</Routes>
```

```jsx
// File: routes/KeycloakRoute.jsx
import { Navigate } from "react-router-dom";
import keycloak from "../keycloak";

function KeycloakRoute({ children, role, redirectTo = "/" }) {
  
  if (!keycloak.authenticated) {
    return <Navigate replace to={redirectTo} />;
  }

  if (keycloak.hasRealmRole(role)) {
    return <>{children}</>;
  }

  return <Navigate replace to={redirectTo} />;
}

export default KeycloakRoute;
```

## Axios Interceptor

The custom [Axios request interceptor](https://axios-http.com/docs/interceptors) automatically attaches the existing Auth Token from the Keycloak library to every request as an Authorization header using the [Bearer Token](https://oauth.net/2/bearer-tokens/) pattern.

## Custom hooks

This project uses custom hooks to make code more re-usable. All hooks can be found in the `./src/hooks/` folder of the project.

### `useProducts`

Make an HTTP request using axios to a local server. Provides the products and an optional error message as properties on an object.

> Note: The repository uses a mock server that does not exist. You should replace the URL with your own server's endpoint.

## Dependencies

- [keycloak-js](https://www.npmjs.com/package/keycloak-js)
- [axios](https://github.com/axios/axios)

## Authors

- [@dewald-els](https://github.com/dewald-els)

## License

[MIT](./LICENSE.md)
