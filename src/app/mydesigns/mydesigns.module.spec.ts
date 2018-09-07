import { MydesignsModule } from './mydesigns.module';

describe('MydesignsModule', () => {
  let mydesignsModule: MydesignsModule;

  beforeEach(() => {
    mydesignsModule = new MydesignsModule();
  });

  it('should create an instance', () => {
    expect(mydesignsModule).toBeTruthy();
  });
});
