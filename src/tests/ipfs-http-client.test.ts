import { IpfsKuboRpcHttpClient } from "../modules/ipfs-http-client";
import "dotenv/config";
import * as fs from "fs";

describe("Ipfs http client integration test", () => {
  const client = new IpfsKuboRpcHttpClient(process.env.RPC_API_URL);
  test("Test add", async () => {
    const res = await client.add({
      content: "Some test content on IPFS",
    });
    expect(res.Hash).toBe(
      "bafkreigyq6zcb6ek7gm2gpcbexqjiy6yh62ajfgnunqi63crxskmidp4j4"
    );
    expect(res.Size).toBeGreaterThan(0);
  });

  test("Test add buffer", async () => {
    const res = await client.add({
      content: Buffer.from("Some test content on IPFS"),
    });
    expect(res.Hash).toBe(
      "bafkreigyq6zcb6ek7gm2gpcbexqjiy6yh62ajfgnunqi63crxskmidp4j4"
    );
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
    const fileStream = fs.createReadStream(
      "./src/tests/test-files/test-file-1.png"
    );

    const res = await client.add({
      content: fileStream,
      fileName: "test-file-1.png",
      contentType: "image/png",
    });
    expect(res.Hash).toBeTruthy();
    expect(res.Size).toBeGreaterThan(0);
  });

  test.only("Test get ipfs version", async () => {
    const res = await client.version();
    expect(res.Version).toBeTruthy();
    expect(res.Commit).toBeTruthy();
    expect(res.Golang).toBeTruthy();
    expect(res.Repo).toBeTruthy();
    expect(res.System).toBeTruthy();
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
      const fileStream = fs.createReadStream(
        "./src/tests/test-files/test-file-1.png"
      );

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
      expect(res.Value).toContain(
        "bafkreiakrvel4n4dd3jirros2dbow7jvtrdtfq2pbj6i7g6qpf64krmqfe"
      );
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
      expect(
        res.find(
          (x) =>
            x == "bafkreiakrvel4n4dd3jirros2dbow7jvtrdtfq2pbj6i7g6qpf64krmqfe"
        )
      ).toBeTruthy();
    });

    test("Test remove pins", async () => {
      const res = await client.pin.rm({
        cids: ["bafkreiakrvel4n4dd3jirros2dbow7jvtrdtfq2pbj6i7g6qpf64krmqfe"],
      });
      expect(res).toBeTruthy();
    });
  });
});
