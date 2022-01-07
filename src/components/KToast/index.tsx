import Notification from 'rc-notification';
import type { NotificationInstance, NoticeContent } from 'rc-notification/lib/Notification';
import './index.css';

let notificationInstance: NotificationInstance;
Notification.newInstance({}, (n) => {
  notificationInstance = n;
});

interface Props {}

const KToast: React.FC<Props> = (props) => {
  return <div></div>;
};

export const toast = (props: Partial<NoticeContent> = {}) => {
  notificationInstance.notice({
    ...props,
  });
};

export default KToast;
