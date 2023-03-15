import keycloak from "../keycloak";

function ProfilePage() {

  return (
    <div>
      <h1>Profile Page</h1>
      { keycloak.tokenParsed &&
       <div>
          <h4>User</h4>
          
            <p>Name: { keycloak.tokenParsed.name}</p>
            <p>Username: { keycloak.tokenParsed.preferred_username}</p>
            <p>Sub: { keycloak.tokenParsed.sub }</p>
          
         </div>
      }
      {keycloak.token && (
        <div>
          <h4>Token</h4>
          <pre>{keycloak.token}</pre>
        </div>
      )}
    </div>
  );
}
export default ProfilePage;
