//#region interfaces

export interface IVersion {
  Commit: string;
  Golang: string;
  Repo: string;
  System: string;
  Version: string;
}
export interface IAddResult {
  Hash: string;
  Size: number;
}

export interface IObject {
  Hash: string;
  Links: IEntry[];
}

export interface IClientError {
  status: number;
  statusText: string;
  message: string;
  error?: any;
}

export interface IStat {
  Hash: string;
  Size: number;
  CumulativeSize: number;
  /**
   * file, directory
   */
  Type: string;
}

export interface IEntry {
  Name: string;
  /**
   * 0 = file, 1 = directory
   */
  Type: number;
  Hash: string;
  /**
   * 0 if directory, greater otherwise
   */
  Size: number;
}

export interface IKeyGenResult {
  Id: string;
  Name: string;
}

export interface INamePublishResult {
  Name: string;
  Value: string;
}
//#endregion
