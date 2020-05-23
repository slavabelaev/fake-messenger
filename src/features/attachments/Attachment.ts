export interface Attachment {
    id: string;
    name: File['name'];
    size: File['size'];
    type: File['type'];
    lastModified: File['lastModified'];
    imageUrl?: string;
}
