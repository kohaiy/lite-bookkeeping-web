import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { subscribeToLoading, unsubscribeToLoading } from '../../initialize/axios';
import { isLoadingState } from '../../store';

export function LoadingSubscription() {
  const setLoading = useSetRecoilState(isLoadingState);

  useEffect(() => {
    subscribeToLoading(setLoading);
    return function cleanup() {
      unsubscribeToLoading();
    };
  });

  return null;
}
