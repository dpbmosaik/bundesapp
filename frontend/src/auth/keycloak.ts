import { useLoggedInUserStore } from "@/store/loggedInUser";

export default {
  saveUserInfoInStore(userInfo) {
    console.log(userInfo);
    const user = useLoggedInUserStore()
    user.updateUserData(userInfo);
  },
  saveAuthInfoInStore(data) {
    console.log(data);
    const user = useLoggedInUserStore()
    user.updateAuthData(data);
  }
};
