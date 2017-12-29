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
}