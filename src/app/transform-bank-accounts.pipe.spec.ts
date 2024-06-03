import { TransformBankAccountsPipe } from './transform-bank-accounts.pipe';

describe('TransformBankAccountsPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformBankAccountsPipe();
    expect(pipe).toBeTruthy();
  });
});
