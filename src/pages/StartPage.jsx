import keycloak from "../keycloak";

/**
 * Example Start Page using Keycloak Context.
 */
function StartPage() {
  return (
    <div>
      <h1>Start Page</h1>

      <section className="actions">
        {!keycloak.authenticated && (
          <button onClick={() => keycloak.login()}>Login</button>
        )}
      
      </section>

      
    </div>
  );
}
export default StartPage;
