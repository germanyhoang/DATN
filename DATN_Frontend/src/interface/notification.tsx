export interface Inotification {
        _id: string,
        email: string,
        role: number,
        notification_title: string,
        notification_content: string,
        created_at: Date;
        isRead: boolean;
        notificationImage: string,
        notification_url:string
}
export interface isRead {
        isRead: boolean;
}