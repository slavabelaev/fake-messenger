import {Model} from "../interfaces/Model";

export interface Attachment extends Model {
    name: File['name'];
    size: File['size'];
    type: File['type'];
    lastModified: File['lastModified'];
    imageUrl?: string;
}
