"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
class ClientError {
    constructor(err) {
        var _a;
        console.error(err);
        this.error = err;
        this.status = this.error.response.status;
        this.statusText = this.error.response.statusText;
        this.message = (_a = this.error.response.data) === null || _a === void 0 ? void 0 : _a.Message;
        if (!this.message && typeof this.error.response.data === "string") {
            this.message = this.error.response.data;
        }
    }
}
exports.ClientError = ClientError;
//# sourceMappingURL=client-error.js.map