import Notification from 'rc-notification';
import type { NotificationInstance, NoticeContent } from 'rc-notification/lib/Notification';
import './index.scss';

let notificationInstance: NotificationInstance;
Notification.newInstance(
  {
    style: {},
  },
  (n) => {
    notificationInstance = n;
  }
);

interface Props {}

const KToast: React.FC<Props> = (props) => {
  return <div></div>;
};

export const toast = (props: Partial<NoticeContent> = {}) => {
  notificationInstance.notice({
    duration: 2,
    ...props,
  });
};

export default KToast;
