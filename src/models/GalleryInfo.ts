import { Artist, RawArtistData } from "./Artist";
import { Character, RawCharacterData } from "./Character";
import { File, RawFileData } from "./File";
import { Group, RawGroupData } from "./Group";
import { Language, RawLanguageData } from "./Language";
import { Parody, RawParodyData } from "./Parody";
import { Tag, RawTagData } from "./Tag";

export interface RawGalleryInfoData {
  date: string;
  galleryurl: string;
  id: number;
  japanese_title: string | null;
  language_localname: string;
  language_url: string;
  language: string;
  title: string;
  type: string;
  video: string | null;
  videofilename: string | null;
  blocked: boolean;
  datepublished: string | null;
  artists: RawArtistData[];
  characters: RawCharacterData[];
  files: RawFileData[];
  groups: RawGroupData[];
  languages: RawLanguageData[];
  parodys: RawParodyData[];
  related: number[];
  scene_indexes: number[];
  tags: RawTagData[];
}

export class GalleryInfo {
  public readonly date: Date;
  public readonly galleryurl: string;
  public readonly id: number;
  public readonly japaneseTitle: string | null;
  public readonly languageLocalname: string;
  public readonly languageUrl: string;
  public readonly language: string;
  public readonly title: string;
  public readonly type: string;
  public readonly video: string | null;
  public readonly videofilename: string | null;
  public readonly blocked: boolean;
  public readonly datepublished: string | null;
  public readonly artists: Artist[];
  public readonly characters: Character[];
  public readonly files: File[];
  public readonly groups: Group[];
  public readonly languages: Language[];
  public readonly parodys: Parody[];
  public readonly related: number[];
  public readonly sceneIndexes: number[];
  public readonly tags: Tag[];

  constructor(data: RawGalleryInfoData) {
    this.date = new Date(data.date);
    this.galleryurl = data.galleryurl;
    this.id = data.id;
    this.japaneseTitle = data.japanese_title ?? null;
    this.languageLocalname = data.language_localname;
    this.languageUrl = data.language_url;
    this.language = data.language;
    this.title = data.title;
    this.type = data.type;
    this.video = data.video ?? null;
    this.videofilename = data.videofilename ?? null;
    this.blocked = data.blocked ?? false;
    this.datepublished = data.datepublished ?? null;
    this.artists = data.artists.map(artist => new Artist(artist));
    this.characters = data.characters.map(character => new Character(character));
    this.files = data.files.map(file => new File(file));
    this.groups = data.groups.map(group => new Group(group));
    this.languages = data.languages.map(language => new Language(language));
    this.parodys = data.parodys.map(parody => new Parody(parody));
    this.related = data.related;
    this.sceneIndexes = data.scene_indexes;
    this.tags = data.tags.map(tag => new Tag(tag));
  }
}
