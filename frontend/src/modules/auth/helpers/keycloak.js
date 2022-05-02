import axios from "axios";

export default {
  setRefreshInterval(keycloak) {
    setInterval(() => {
      keycloak
        .updateToken(70) // 7 sec
        .then((refreshed) => {
          if (refreshed) {
            console.log(`Token refreshed ${refreshed}`);
          } else {
            console.log(
              `Token not refreshed, valid for ${Math.round(
                keycloak.tokenParsed.exp +
                  keycloak.timeSkew -
                  new Date().getTime() / 1000
              )} seconds`
            );
          }
        })
        .catch(() => {
          console.log("Failed to refresh token");
        });
    }, 6000); // 6 sec
  },
  getPersonalData() {
    const path = `${process.env.VUE_APP_API}/auth/user/`;
    axios.get(path).then((result) => {
      console.log(result);
    });
  },
};
