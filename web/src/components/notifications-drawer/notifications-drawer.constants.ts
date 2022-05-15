import { getGroups } from '@utils/group-data';

export const groupNotificationsByDate = (notifications: any[]) => getGroups({ notifications }).reverse() as any[];
