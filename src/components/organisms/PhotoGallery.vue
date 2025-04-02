<template>
    <div>
      <div class="columns-2 gap-4 space-y-4">
        <div
          v-for="(photo, index) in photos"
          :key="index"
          class="break-inside-avoid cursor-pointer"
          @click="() => openModal(index)"
        >
          <img :src="photo.url" alt="Wedding Photo" class="w-full rounded-md" />
        </div>
      </div>
  
      <!-- Image Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        @click.self="closeModal"
      >
        <div class="relative transition-transform duration-300" :class="{'scale-in': isOpening}" @touchstart="startInteraction">
          <div :class="slideDirection">
            <img :src="currentPhoto.url" alt="Image" class="max-h-[90vh] rounded-md" />
          </div>
        </div>
        <!-- Close Button -->
        <button @click="closeModal" class="fixed top-4 right-4 text-white text-xl z-50">✕</button>
        <!-- Navigation Buttons -->
        <div @click="prevPhoto" class="fixed left-1 top-1/2 translate-y-[-50%] w-[36px] lg:w-[64px] z-50">
            <img src="/icons/arrow-left.png" alt="arrow-left" class="w-full">
        </div>
        <div @click="nextPhoto" class="fixed right-1 top-1/2 translate-y-[-50%] w-[36px] lg:w-[64px] z-50">
            <img src="/icons/arrow-right.png" alt="arrow-right" class="w-full">
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const photos = ref([
    { url: 'https://placehold.co/400x400' },
    { url: 'https://placehold.co/500x300' },
    { url: 'https://placehold.co/600x1400' },
    { url: 'https://placehold.co/700x400' },
    { url: 'https://placehold.co/800x350' },
    { url: 'https://placehold.co/500x300' },
    { url: 'https://placehold.co/600x1400' },
    { url: 'https://placehold.co/600x1400' },
    { url: 'https://placehold.co/700x400' },
    { url: 'https://placehold.co/400x400' },
  ]);
  
  const showModal = ref(false);
  const currentPhoto = ref(null);
  const currentIndex = ref(0);
  const isOpening = ref(false);
  const slideDirection = ref('');
  let startTouchX = 0;
  
  watch(showModal, () => {
    document.body.style.overflow = showModal.value ? 'hidden' : '';
  });

  const openModal = (index) => {
    currentIndex.value = index;
    currentPhoto.value = photos.value[index];
    showModal.value = true;
    isOpening.value = true;
  
    setTimeout(() => {
      isOpening.value = false;
    }, 300); // End of scale-in animation
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  const nextPhoto = () => {
    slideDirection.value = 'slide-left';
    currentIndex.value = (currentIndex.value + 1) % photos.value.length;
    currentPhoto.value = photos.value[currentIndex.value];
    resetSlideDirection();
  };
  
  const prevPhoto = () => {
    slideDirection.value = 'slide-right';
    currentIndex.value = (currentIndex.value - 1 + photos.value.length) % photos.value.length;
    currentPhoto.value = photos.value[currentIndex.value];
    resetSlideDirection();
  };
  
  const resetSlideDirection = () => {
    setTimeout(() => {
      slideDirection.value = '';
    }, 300); // Duration of the slide animation
  };
  
  const startInteraction = (event) => {
    if (event.type === 'touchstart') {
      startTouchX = event.touches[0].clientX;
      document.addEventListener('touchend', handleSwipe);
    }
  };
  
  const handleSwipe = (event) => {
    const endTouchX = event.changedTouches[0].clientX;
    const swipeThreshold = 50;
  
    if (startTouchX - endTouchX > swipeThreshold) nextPhoto();
    else if (endTouchX - startTouchX > swipeThreshold) prevPhoto();
  
    document.removeEventListener('touchend', handleSwipe);
  };
  </script>
  
  <style scoped>
  @keyframes scaleIn {
    0% { transform: scale(0.8); }
    100% { transform: scale(1); }
  }
  
  .scale-in {
    animation: scaleIn 0.3s forwards;
  }
  
  .slide-left {
    animation: slideLeft 0.3s forwards;
  }
  
  .slide-right {
    animation: slideRight 0.3s forwards;
  }
  
  @keyframes slideLeft {
    0% { transform: translateX(100%); }
    100% { transform: translateX(0); }
  }
  
  @keyframes slideRight {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(0); }
  }
  
  img {
    transition: transform 0.2s;
  }
  </style>
  