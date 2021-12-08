<template>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"/>
  <div>
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Profilbild erstellen
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Die Bundesapp ist ein Service des Deutschen Pfadfinder Bund Mosaik.
        </p>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
            <input
                ref="input"
                type="file"
                name="image"
                accept="image/*"
                @change="setImage"
            />
            <button type="button"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
                    text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-indigo-500"
                    href="#"
                    role="button"
                    @click.prevent="showFileChooser">
              Wähle dein Profil Bild
            </button>
            <div class="mx-auto">
              <vue-cropper v-if="imgSrc"
                           ref="cropper"
                           :src="imgSrc"
                           preview=".preview"
                           :cropBoxResizable=false
                           :minCropBoxWidth="finalCropSize"
                           :minCropBoxHeight="finalCropSize"
                           :minCanvasWidth=finalCropSize
                           :minCanvasHeight="finalCropSize"
                           :minContainerWidth="finalCropSize"
                           :minContainerHeight="finalCropSize"
                           dragMode='move'
                           :aspectRatio="1/1"/>

              <img class="mx-auto" v-else src="@/assets/images/profile_default.jpg">
            </div>

            <div class="flex items-center justify-center mb-4">
              <button @click.prevent="rotate(90)"
                      class="text-purple-500 bg-transparent border-l border-t border-b border-purple-500
                  hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3
                  rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                      type="button">
                <i class="far fa-arrow-alt-circle-left"/>
              </button>
              <button @click.prevent="reset"
                      class="text-purple-500 bg-transparent border border-solid border-purple-500 hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                      type="button">
                <i class="fas fa-undo"></i>
              </button>
              <button @click.prevent="rotate(-90)"
                      class="text-purple-500 bg-transparent border-t border-b border-r border-purple-500
                   hover:bg-purple-500 hover:text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3
                   rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                      type="button">
                <i class="far fa-arrow-alt-circle-right"/>
              </button>
            </div>

            <div class="flex justify-end mb-4">
              <button type="button" @click.prevent="cropImage" :disabled="!imageSelected"
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4
                      font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                Hochladen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <error-modal ref="errorModal"/>
  <confirm-profile-image-upload ref="confirmUploadModal" @onConfirmed="onConfirmed"/>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import ErrorModal from "../directory/ErrorModal";
import ConfirmProfileImageUpload from "./ConfirmProfileImageUpload";
import axios from "axios";

export default {
  components: {
    ErrorModal,
    VueCropper,
    ConfirmProfileImageUpload
  },
  data() {
    return {
      imgSrc: null,
      cropImg: '',
      finalCropSize: 256,
      imageSelected: false,
    };
  },
  methods: {
    cropImage() {
      if (this.$refs.cropper) {
        // get image data for post processing, e.g. upload or setting image src
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        this.confirmUpload();
      } else {
        this.showWarning("Du musst ein Bild auswählen bevor du es hochladen kannst");
      }
    },
    reset() {
      if (this.$refs.cropper) {
        this.$refs.cropper.reset();
      }
    },
    rotate(deg) {
      if (this.$refs.cropper) {
        this.$refs.cropper.rotate(deg);
      }
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf('image/') === -1) {
        this.showWarning("Bitte wähle ein Bild aus")
        return;
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          if (this.$refs.cropper) {
            this.$refs.cropper.replace(event.target.result);
          }
          this.imageSelected = true;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageSelected = false;
        this.showWarning("Auf deinem Gerät können wir leider keine Bilder hochladen, " +
            "bitte probiere es auf einem anderen Gerät")
        alert('Sorry, FileReader API not supported');
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    showWarning(message) {
      this.$refs.errorModal.show(message);
    },
    confirmUpload() {
      this.$refs.confirmUploadModal.onShow(this.cropImg);
    },
    onConfirmed(confirmed) {
      if (confirmed) {
        const path = `${process.env.VUE_APP_API}/auth/upload-profile-photo/`;
        this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
          let formData = new FormData();
          formData.append('file', blob);
          // formData.append('image_type', 'private');
          axios.post(path, formData)
              .then((result) => {
                console.log(result);
              }).catch((error) => {
            console.log(error);
          });
        });
      }
    }
  },
};
</script>

<style>

input[type="file"] {
  display: none;
}

.cropped-image img {
  max-width: 100%;
}

.cropper-crop-box, .cropper-view-box {
  border-radius: 50%;
}

.cropper-view-box {
  box-shadow: 0 0 0 1px #39f;
  outline: 0;
}

.cropper-dashed,
.cropper-point.point-se,
.cropper-point.point-sw,
.cropper-point.point-nw,
.cropper-point.point-ne,
.cropper-line {
  display: none !important;
}

.cropper-view-box {
  outline: inherit !important;
}
</style>
