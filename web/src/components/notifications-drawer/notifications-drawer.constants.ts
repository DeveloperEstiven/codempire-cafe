import { ICompletedOrder } from '@store/reducers/notifications/notifications.typings';
import { getGroups } from '@utils/group-data';

export const groupNotificationsByDate = (notifications: ICompletedOrder[]) => getGroups({ notifications }) as any[];
