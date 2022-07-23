export class Unauthorized extends Error {
    constructor(paramName: string) {
        super(`Unauthorized: ${paramName}`);
        this.name = "Unauthorized";
    }
}
