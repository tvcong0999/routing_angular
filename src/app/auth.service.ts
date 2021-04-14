export class AuthService {
    loggedIn = true;
    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 100);
            });
        return promise;
    }
    loggin() {
        this.loggedIn = true;
    }
    logout() {
        this.loggedIn = false;
    }
}