export interface RawParodyData {
  parody: string;
  url: string;
}

export class Parody {
  public readonly parody: string;
  public readonly url: string;

  constructor(data: RawParodyData) {
    this.parody = data.parody;
    this.url = data.url;
  }
}
