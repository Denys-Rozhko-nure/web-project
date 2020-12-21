import {createApi} from "unsplash-js";

const unsplash = createApi({
    accessKey: 'EiISWC9f5-zCvMbPVg5s9ysf6uQxaIE6I0pOKLEBEAo'
});

const slider = {
    photos: [],
    index: -1,
    async init() {
        if(this.photos.length == 0) {
            try {
                await this.addPhotos();

                this.index = 0;
                this.setImage(this.photos[0]);
                document.getElementById("arrow_back").classList.add("disabled");
                document.getElementById("arrow_back").addEventListener("click", event => this.moveBack());
                document.getElementById("arrow_forward").addEventListener("click", event => this.moveForward());
            } catch (err) {
                document.querySelector("picture+p").innerText = "Увы, неудалось загрузить фото.";
                console.log(err);
            }
        }
    },
    async addPhotos() {
        try {
            const newPhotos =  await unsplash.photos.getRandom({
                query: "coffee",
                count: 30,
                orientation: "squarish"
            });

            this.photos.push(...newPhotos.response);
        } catch (err) {
            document.querySelector("picture+p").innerText = "Увы, неудалось загрузить новые фото.";
            console.log(err);
        }
    },
    moveForward() {
        let waitForAdding = false;

        if(this.photos.length - this.index < 10) {
            this.addPhotos()
            .then(result => {
                if(waitForAdding) {
                    this.moveForward();
                }
            });
        }
        if(this.photos.length - 1 == this.index) {
            waitForAdding = true;
        } else {
            this.index++;
            this.setImage(this.photos[this.index]);
            document.getElementById("arrow_back").classList.remove("disabled");
        }
    },
    moveBack() {
        if(this.index != 0) {
            this.index--;
            this.setImage(this.photos[this.index]);
        }

        if(this.index == 0) {
            document.getElementById("arrow_back").classList.add("disabled");
        }
    },
    setImage(photo) {
        const picture = document.getElementById("picture");
        picture.innerHTML = `
            <source srcset="${photo.urls.full}" media="(min-width: 1200px)">
            <source srcset="${photo.urls.regular}" media="(min-width: 500px)">
            <source srcset="${photo.urls.small}" media="(min-width: 0px)">

            <img src="${photo.urls.full}" alt="image with a coffee">
        `;
        console.log(picture.innerHTML);
    }
};

export default slider;