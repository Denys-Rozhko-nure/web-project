import {createApi} from "unsplash-js";
import animate from "./animate";

 function animatePromise({draw, timing, duration}) {
    const pureDraw = draw;
    return new Promise((resolve, reject) => {
        animate({
            timing,
            duration,
            draw: function(progress){
                pureDraw(progress);
                if(progress == 1) {
                    resolve();
                }
            }
        });
    });
}

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
                this.setCurrentImage(this.photos[0]);
                this.setNextImage(this.photos[1]);
                document.getElementById("arrow_back").classList.add("disabled");
                document.getElementById("arrow_back").addEventListener("click", event => this.moveBack());
                document.getElementById("arrow_forward").addEventListener("click", event => this.moveForward());
            } catch (err) {
                document.querySelector(".picture-container+p").innerText = "Увы, не удалось загрузить фото.";
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
            document.querySelector(".picture-conrainer+p").innerText = "Увы, не удалось загрузить новые фото.";
            console.log(err);
        }
    },
    __isAnamationActive: false,
    async moveForward() { 
        if(this.__isAnamationActive) return;

        this.__isAnamationActive = true;

        let waitForAdding = false;

        if(this.photos.length - this.index < 10) {
            this.addPhotos()
            .then(result => {
                if(waitForAdding) {
                    this.moveForward();
                }
            });
        }
        if(this.photos.length - 2 == this.index) {
            waitForAdding = true;
        } else {
            this.index++;
            
            const currentPicture = document.getElementById("current-picture");
            const rect = currentPicture.getBoundingClientRect();
            const width = rect.right - rect.left;
            const draw = (progress) => {
                currentPicture.style.right = width*progress + "px";
                currentPicture.style.opacity = 1-progress;
            }
            const easeIn = t => t*t*t;

            document.getElementById("arrow_back").classList.remove("disabled");
            await animatePromise({
                draw,
                timing: easeIn,
                duration: 1000
            }); 
            currentPicture.style.right = null;
            currentPicture.style.opacity = 1;

            this.setCurrentImage(this.photos[this.index]);
            this.setNextImage(this.photos[this.index + 1]);
        }

        this.__isAnamationActive = false;
    },
    async moveBack() {
        if(this.__isAnamationActive) return;

        this.__isAnamationActive = true;

        if(this.index != 0) {
            this.index--;

            this.setNextImage(this.photos[this.index]);

            const currentPicture = document.getElementById("current-picture");
            const rect = currentPicture.getBoundingClientRect();
            const width = rect.right - rect.left;

            const draw = (progress) => {
                currentPicture.style.left = width*progress + "px";
                currentPicture.style.opacity = 1-progress;
            }
            const easeIn = t => t*t*t;
            if(this.index == 0)
                document.getElementById("arrow_back").classList.add("disabled");

            await animatePromise({
                draw,
                timing: easeIn,
                duration: 1000
            }); 
            currentPicture.style.left = null;
            currentPicture.style.opacity = 1;

            this.setCurrentImage(this.photos[this.index]);
            this.setNextImage(this.photos[this.index + 1]);
        }

        this.__isAnamationActive = false;
    },
    __setImage(photo, whichPicture) {
        const picture = document.getElementById(`${whichPicture}picture`);
        picture.innerHTML = `
            <source srcset="${photo.urls.thumb}" media="(max-width: 200px)">
            <source srcset="${photo.urls.small}" media="(max-width: 500px)">
            <source srcset="${photo.urls.full}" media="(max-width: 1200px) and (min-resolution: 144dpi)">
            <source srcset="${photo.urls.regular}" media="(max-width: 1200px)">

            <img src="${photo.urls.full}" alt="${photo.desctription}" title="${photo.desctription}">
        `;
    },
    setCurrentImage(photo) {
        this.__setImage(photo, "current-");
    },
    setNextImage(photo) {
        this.__setImage(photo, "next-");
    }
};

export default slider;