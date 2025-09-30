export interface RawTagsData {
  artists: string[]
  groups: string[]
  series: string[]
  characters: string[]
  tag: string[]
  male: string[]
  female: string[]
  type: string[]
  language: string[]
}

export class Tags {
  public readonly artists: string[]
  public readonly groups: string[]
  public readonly series: string[]
  public readonly characters: string[]
  public readonly tag: string[]
  public readonly male: string[]
  public readonly female: string[]
  public readonly type: string[]
  public readonly language: string[]

  constructor(data: RawTagsData) {
    this.artists = data.artists
    this.groups = data.groups
    this.series = data.series
    this.characters = data.characters
    this.tag = data.tag
    this.male = data.male
    this.female = data.female
    this.type = data.type
    this.language = data.language
  }
}