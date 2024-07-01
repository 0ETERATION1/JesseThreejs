export default class ModalContentProvider {
    constructor() {
      this.modalContents = {
        aboutMe: {
          title: 'About me',
          description: 'me',
        },
        projects: {
          title: 'Projects',
          description: 'me',
        },
        contactMe: {
          title: 'Contact Me',
          description: 'me',
        },
      }
    }
  
    getModalInfo(portalName) {
      return this.modalContents[portalName];
    }
  }
  