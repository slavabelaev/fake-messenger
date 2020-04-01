import {Model} from "../interfaces/Model";

export interface AttachmentLink extends Model {
    title: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
    url: string;
}
