# ipfs-kubo-rpc-http-client

Simple library which wraps some basic IPFS kubo RPC api calls into simple functions.
Check detail documentation for IPFS kubo RPC api [here](https://docs.ipfs.tech/reference/kubo/rpc/)

## Requirements

- node.js 16.17.0 or higher

## Getting started

### Installation

Library can be used via Git import and is not accessible on NPM.

Add below code to `package.json` in dependency section, to install library in your project.

```json
{
    ...
    "@apillon/ipfs-kubo-rpc-http-client": "github:Apillon/ipfs-kubo-rpc-http-client",
    ...
}
```

### Initialization

Library is working directly with IPFS kubo RPC api. Initialize client like so:

```ts
const client = new IpfsKuboRpcHttpClient(process.env.RPC_API_URL);
```

### Upload content to IPFS

To upload data to IPFS use client.add method, which expects content as parameter. Content is of type `any`.
As a response, library returns instance of [`IAddResult`](./src/types/types.ts) interface with `Hash` and `Size` properties.

```ts
await client.add({ content: "Some test content on IPFS" });
```

### Mutable file system (MFS)

Because files in IPFS are content-addressed and immutable, they can be complicated to edit. Mutable File System (MFS) is a tool built into IPFS that lets you treat files like you would a regular name-based filesystem.

[`Files`](./src/modules/files.ts) class implements below methods, to work with MFS:

- write: write content to IPFS MFS
- ls: list all entries for path
- stat: get properties of a object in a given path

Example of writing content to MFS:

```ts
await client.files.write({
  content: "This is file in MFS",
  path: "/path-to-file/My MFS file.txt",
});
```

### Inter planetary name system (IPNS)

The InterPlanetary Name System (IPNS) is a system for creating mutable pointers to CIDs known as names or IPNS names. IPNS names can be thought of as links that can be updated over time, while retaining the verifiability of content addressing.

[`Name`](./src/modules/name.ts) class implements below methods, to work with IPNS.

- publish: publish CID to IPNS. In order to publish CID to IPNS, key is required. It can be generated using [`Key`](./src/modules/key.ts) class, with method `gen`.

### File pinning

Pinning is the mechanism that allows you to tell IPFS to always keep a given object somewhere — the default being your local node.

[`Pin`](./src/modules/pin.ts) class implements below methods, to manage pinned files on IPFS node:

- add: pin path(file) to ipfs node
- ls: list pinned files
- rm: unpin given path(file) from node

Pin CID example:

```ts
await client.pin.add({
  cids: ["bafkreiakrvel4n4dd3jirros2dbow7jvtrdtfq2pbj6i7g6qpf64krmqfe"],
});
```

## Error handling

Library return instance of [`ClientError`](./src/types/client-error.ts) class if error (client or API) occurs.

Error has below properties:

| field      | description                                                           |
| ---------- | --------------------------------------------------------------------- |
| status     | status code returned from request to RPC API or 400 for client errors |
| statusText | additional info about status                                          |
| message    | error message                                                         |

## Contributing

We welcome contributions to the Apillon ipfs-kubo-rpc-http-client! If you would like to contribute, please follow these steps:

1. Fork this repository.
2. Clone your forked repository to your local machine.
3. Install the dependencies by running npm install.
4. Make your changes and write tests to ensure they work.
5. Commit your changes and push them to your forked repository.
6. Open a pull request to this repository.

Before submitting a pull request, please make sure to run the tests by running npm test. We also recommend running npm run lint to ensure your code follows our coding standards.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.
