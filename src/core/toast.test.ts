import { toast } from './toast';

describe('toast', () => {
  test('should be invokable', () => {
    toast.success('this is a success');
    toast.warning('this is a warning');
    toast('here is some contents', {});
  });
});
