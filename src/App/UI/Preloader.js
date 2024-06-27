import assetStore from "../Utils/AssetStore";

export default class Preloader {
    constructor() {
        this.assetStore = assetStore;

        // giving access to dom
        this.overlay = document.querySelector('.overlay');
        this.loading = document.querySelector('.loading');
        this.startButton = document.querySelector('.start');


        this.assetStore.subscribe((state) => {
            console.log(state.loadedAssets);


            // loading screen
            this.numberOfLoadedAssets = Object.keys(state.loadedAssets).length;
            this.numberOfAssetsToLoad = state.assetsToLoad.length
            this.progress = this.numberOfLoadedAssets / this.numberOfAssetsToLoad;
            this.progress = Math.trunc(this.progress * 100);
            document.getElementById('progressPercentage').innerHTML = this.progress;

            // adding start button if we get to 100%
            if (this.progress === 100) {
                this.loading.classList.add('fade');
                window.setTimeout(() => this.ready(), 1000 )
                
            }
        })
    }

    ready() {
        this.loading.remove();
        this.startButton.style.display = 'inline';
        this.startButton.classList.add('fadeIn');

        this.startButton.addEventListener('click', () => {
            console.log('clicked');
            this.overlay.classList.add('fade');
            this.startButton.classList.add('fadeOut');

            window.setTimeout(() => {
                this.overlay.remove()
                this.startButton.remove()
            }, 2000)

        }, {once: true})
    }
}