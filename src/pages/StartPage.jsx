import keycloak from "../keycloak";

/**
 * Example Start Page using Keycloak Context.
 */
function StartPage() {
  return <div>{!keycloak.authenticated && keycloak.login()}</div>;
}
export default StartPage;
