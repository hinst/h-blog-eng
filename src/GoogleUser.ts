namespace hts {
    export declare class GoogleUser {
        getBasicProfile(): {
            getId(): string;
            getName(): string;
            getImageUrl(): string;
            getEmail(): string;
        }
        getAuthResponse(): {
            id_token: string;
        }
    }

    export function logOut(onSuccess: Function) {
        var auth2 = window["gapi"].auth2.getAuthInstance();
        auth2.signOut().then(onSuccess);
    }
}