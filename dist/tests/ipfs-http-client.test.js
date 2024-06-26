"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipfs_http_client_1 = require("../modules/ipfs-http-client");
require("dotenv/config");
const fs = __importStar(require("fs"));
describe("Ipfs http client integration test", () => {
    const client = new ipfs_http_client_1.IpfsKuboRpcHttpClient(process.env.RPC_API_URL);
    test("Test add", async () => {
        const res = await client.add({
            content: "Some test content on IPFS",
        });
        expect(res.Hash).toBe("bafkreigyq6zcb6ek7gm2gpcbexqjiy6yh62ajfgnunqi63crxskmidp4j4");
        expect(res.Size).toBeGreaterThan(0);
    });
    test("Test add buffer", async () => {
        const res = await client.add({
            content: Buffer.from("Some test content on IPFS"),
        });
        expect(res.Hash).toBe("bafkreigyq6zcb6ek7gm2gpcbexqjiy6yh62ajfgnunqi63crxskmidp4j4");
        expect(res.Size).toBeGreaterThan(0);
    });
    test("Test add with specified fileName and contentType", async () => {
        const res = await client.add({
            content: "Some test content on IPFS named Test.txt, of type text/plain",
            fileName: "Test.txt",
            contentType: "text/plain",
        });
        expect(res.Hash).toBeTruthy();
        expect(res.Size).toBeGreaterThan(0);
    });
    test("Test add readable stream", async () => {
        const fileStream = fs.createReadStream("./src/tests/test-files/test-file-1.png");
        const res = await client.add({
            content: fileStream,
            fileName: "test-file-1.png",
            contentType: "image/png",
        });
        expect(res.Hash).toBeTruthy();
        expect(res.Size).toBeGreaterThan(0);
    });
    test("Test get ipfs version", async () => {
        const res = await client.version();
        expect(res.Version).toBeTruthy();
        expect(res.Commit).toBeTruthy();
        expect(res.Golang).toBeTruthy();
        expect(res.Repo).toBeTruthy();
        expect(res.System).toBeTruthy();
    });
    test("Test convert cid to cid version 1", async () => {
        const res = await client.cidToCidV1("QmU1rFb7CJoGKa32nkv2bD4WHAU8zf9ixtKmtD2ZBoXAAc");
        expect(res).toBe("bafybeicukurt4myiamzegtqmjtd4fozdgby5xitc7lpnyagz553vgviwye");
    });
    describe("Mutable file system tests", () => {
        const mfsFileName = `My_MFS_test_file_${new Date().toDateString()}.txt`;
        test("Test write MFS file", async () => {
            const res = await client.files.write({
                content: "This is file in MFS written on " + new Date().toString(),
                path: `/ipfs-http-client-tests/${mfsFileName}`,
            });
            expect(res).toBeTruthy();
        });
        test("Test write stream to MFS file", async () => {
            const fileStream = fs.createReadStream("./src/tests/test-files/test-file-1.png");
            const res = await client.files.write({
                content: fileStream,
                path: `/ipfs-http-client-tests/image.png`,
            });
            expect(res).toBeTruthy();
        });
        test("Test list MFS entries", async () => {
            const res = await client.files.ls({ path: "/ipfs-http-client-tests" });
            expect(res).toBeTruthy();
            expect(res.length).toBeGreaterThan(0);
            const file = res.find((x) => x.Name == mfsFileName);
            expect(file.Hash).toBeTruthy();
            expect(file.Name).toBeTruthy();
            expect(file.Type).toBe(0);
            expect(file.Size).toBeGreaterThan(0);
        });
        test("Test get stat for path ", async () => {
            const res = await client.files.stat({ path: "/ipfs-http-client-tests" });
            expect(res).toBeTruthy();
            expect(res.Hash).toBeTruthy();
            expect(res.CumulativeSize).toBeTruthy();
            expect(res.Type).toBeTruthy();
        });
    });
    describe("Key & IPNS Name tests", () => {
        const key = "test key " + new Date().toString();
        test("Test generate new key", async () => {
            const res = await client.key.gen({
                name: key,
            });
            expect(res).toBeTruthy();
            expect(res.Id).toBeTruthy();
            expect(res.Name).toBeTruthy();
        });
        test("Test publish name", async () => {
            const res = await client.name.publish({
                cid: "bafkreiakrvel4n4dd3jirros2dbow7jvtrdtfq2pbj6i7g6qpf64krmqfe",
                key,
                resolve: true,
            });
            expect(res).toBeTruthy();
            expect(res.Name).toBeTruthy();
            expect(res.Value).toContain("bafkreiakrvel4n4dd3jirros2dbow7jvtrdtfq2pbj6i7g6qpf64krmqfe");
        });
        test("Test publish name without resolving cid", async () => {
            const res = await client.name.publish({
                cid: "bafkreiakrvel4n4dd3jirros2dbow7jvtrdtfq2pbj6i7g6qpf64krmqfe",
                key,
                resolve: false,
                lifetime: "8760h",
            });
            expect(res).toBeTruthy();
            expect(res.Name).toBeTruthy();
            console.info(res.Name);
        });
    });
    describe("Pin tests", () => {
        test("Test add new pins", async () => {
            const res = await client.pin.add({
                cids: ["bafkreiakrvel4n4dd3jirros2dbow7jvtrdtfq2pbj6i7g6qpf64krmqfe"],
            });
            expect(res).toBeTruthy();
        });
        test("Test list pins", async () => {
            const res = await client.pin.ls({
                cid: "bafkreiakrvel4n4dd3jirros2dbow7jvtrdtfq2pbj6i7g6qpf64krmqfe",
            });
            expect(res).toBeTruthy();
            expect(res.find((x) => x == "bafkreiakrvel4n4dd3jirros2dbow7jvtrdtfq2pbj6i7g6qpf64krmqfe")).toBeTruthy();
        });
        test("Test remove pins", async () => {
            const res = await client.pin.rm({
                cids: ["bafkreiakrvel4n4dd3jirros2dbow7jvtrdtfq2pbj6i7g6qpf64krmqfe"],
            });
            expect(res).toBeTruthy();
        });
    });
});
//# sourceMappingURL=ipfs-http-client.test.js.map