import { TransformBankAccountDetailsPipe } from './transform-bank-account-details.pipe';

describe('TransformBankAccountDetailsPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformBankAccountDetailsPipe();
    expect(pipe).toBeTruthy();
  });
});
