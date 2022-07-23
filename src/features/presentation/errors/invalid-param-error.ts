export class InvalidParam extends Error {
    constructor(paramName: string) {
        super(`Erro: ${paramName}`);
        this.name = "InvalidParamError";
    }
}
