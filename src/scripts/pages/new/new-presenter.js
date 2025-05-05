export default class NewPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showNewFormMap() {
    this.#view.showMapLoading();
    try {
      await this.#view.initialMap();
    } catch (error) {
      console.error('showNewFormMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }

  // async postNewReport({ description, photoBlob, latitude, longitude }) {
  //   // Tampilkan loading button kalau ada
  //   if (typeof this.#view.showSubmitLoadingButton === 'function') {
  //     this.#view.showSubmitLoadingButton();
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append('description', description);
  //     formData.append('photo', photoBlob, 'photo.png');

  //     if (latitude) formData.append('lat', latitude);
  //     if (longitude) formData.append('lon', longitude);

  //     const response = await this.#model.storeNewReport(formData);

  //     if (response.error) {
  //       console.error('postNewReport: response error:', response);
  //       this.#view.storeFailed(response.message);
  //       return;
  //     }

  //     this.#view.storeSuccessfully(response.message);
  //   } catch (error) {
  //     console.error('postNewReport: error:', error);
  //     this.#view.storeFailed(error.message);
  //   } finally {
  //     if (typeof this.#view.hideSubmitLoadingButton === 'function') {
  //       this.#view.hideSubmitLoadingButton();
  //     }
  //   }
  // }

  async postNewReport({ title, damageLevel, description, evidenceImages, latitude, longitude }) {
    const formData = new FormData();
    formData.set('description', description);
    evidenceImages.forEach((image) => {
      formData.append('photo', image); // sesuai spec API
    });
    if (latitude) formData.set('lat', latitude);
    if (longitude) formData.set('lon', longitude);
  
    this.#view.showSubmitLoadingButton();
  
    try {
      const response = await this.#model.storeNewStory(formData); // <-- yang bener
      if (!response.ok) {
        this.#view.storeFailed(response.message);
        return;
      }
      this.#view.storeSuccessfully(response.message, response.data);
    } catch (error) {
      this.#view.storeFailed(error.message);
    } finally {
      this.#view.hideSubmitLoadingButton();
    }
  }
  
}
