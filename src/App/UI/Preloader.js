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
            console.log(this.progress);
        })
    }
}