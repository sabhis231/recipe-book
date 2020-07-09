export class User {

    constructor(
        public emailId: string, 
        private _idToken: string, 
        public refreshToken: string, 
        // private _expireIn: Date,
        public localId?: string) {
    }

    get token() {
        return this._idToken;
    }
}