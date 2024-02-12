"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
class ClientError {
    constructor(err) {
        var _a, _b, _c;
        console.error(err);
        this.error = err;
        //Handle response error
        if (this.error.response) {
            this.status = (_a = this.error.response) === null || _a === void 0 ? void 0 : _a.status;
            this.statusText = (_b = this.error.response) === null || _b === void 0 ? void 0 : _b.statusText;
            this.message = (_c = this.error.response.data) === null || _c === void 0 ? void 0 : _c.Message;
            if (!this.message && typeof this.error.response.data === "string") {
                this.message = this.error.response.data;
            }
        }
        if (this.error.errors) {
            //Handle Axios API error
            this.status = 400;
            this.statusText = this.error.code;
            this.message = this.error.errors[0].message;
        }
    }
}
exports.ClientError = ClientError;
//# sourceMappingURL=client-error.js.map