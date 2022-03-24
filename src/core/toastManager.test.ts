import { toastManager, Event, ToastEmit } from './toastManager';

const args = {
  content: 'hello',
  toastId: '123',
  type: 'success',
  toastAutoClose: false,
  toastShowIcon: false,
  toastClassName: '',
} as ToastEmit;

describe('toastManager', () => {
  test('should be mountable', () => {
    jest.useFakeTimers();
    const testfn = jest.fn;
    const sub1 = toastManager.subscribe(Event.Show, testfn);
    const sub2 = toastManager.subscribe(Event.Clear, testfn);
    const toastList = toastManager.getToastList();
    expect(toastList.length).toEqual(0);
    toastManager.publish(Event.Clear, 1);
    toastManager.publish(Event.Show, args);
    //jest.advanceTimersByTime(500);
  });
  test('should handle id', () => {
    toastManager.setContainerId('1');
    const id = toastManager.getContainerId();
    expect(id).toEqual('1');
  });
  test('should set toast position', () => {
    toastManager.setToastPosition('top-right');
    expect(toastManager.toastPosition).toEqual('top-right');
  });
});
