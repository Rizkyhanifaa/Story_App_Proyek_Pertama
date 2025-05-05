export default class BookmarkPage {
  async render() {
    return '';
  }

  async afterRender() {
    alert('Halaman Cerita Tersimpan akan segera hadir!');

    location.hash = '/';
  }
}
