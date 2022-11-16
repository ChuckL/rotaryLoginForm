/* eslint-disable no-return-assign */

export class ApplicationModule {
  private instances: Record<string, any> = {};
  private static applicationModuleInstance: ApplicationModule;

  static getInstance() {
    if (!this.applicationModuleInstance) {
      this.applicationModuleInstance = new ApplicationModule();
    }
    return this.applicationModuleInstance;
  }

  private constructor() { }

  // public getFileLoaderPresenter(): FileLoaderPresenter {
  //   return this.instances.myFileLoaderPresenter = this.instances.myFileLoaderPresenter ||
  //     new FileLoaderPresenter();
  // }
}
