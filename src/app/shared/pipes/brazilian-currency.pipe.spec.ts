import { BrazilianCurrencyPipe } from './brazilian-currency.pipe';

describe('BrazilianCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new BrazilianCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
