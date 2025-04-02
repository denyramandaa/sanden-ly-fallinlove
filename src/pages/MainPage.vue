<template>
  <div>
    <div class="fixed z-40 w-[36px] h-[36px] left-[16px] bottom-[16px] cursor-pointer custom-animate-spin" @click="playAndPauseAudio(audioIsPlaying)">
      <img v-if="audioIsPlaying" src="/icons/play-music.svg" alt="icon play" key="play">
      <img v-else src="/icons/pause-music.svg" alt="icon pause" key="pause">
    </div>
    <!-- cover -->
    <div class="w-full min-h-screen bg-black text-white relative" ref="cover">
      <div class="absolute left-0 top-0 w-full h-full bg-cover bg-[url(/images/cover.jpg)]" ref="parallax"></div>
      <div class="absolute left-0 top-0 w-full h-full bg-gray-700/60 flex items-end justify-center">
        <div class="w-full px-4 text-center pb-[140px]">
          <p class="leading-none font-body">The Wedding of</p>
          <h1 class="font-title text-[54px] leading-none py-2">
            Deny & Sandra 
          </h1>
          <p class="leading-none c text-lg">31 • 08 • 2025</p>
        </div>
      </div>
      <div class="absolute left-0 bottom-[-1px] w-full h-[140px] bg-cover bg-[url(/images/paper-separator-bottom.png)]"></div>
    </div>

    <!-- quotes -->
    <div class="w-full relative bg-[url(/images/paper-background.jpg)] relative">
      <div class="px-6 text-center py-12">
        <p class="font-quote text-[24px] pb-4 drop-shadow">‟To love someone deeply gives you strength. To be loved deeply gives you courage.”</p>
        <p class="text-[16px] font-body font-bold text-[#959595]">- Lao Tzu -</p>
      </div>
      <div class="absolute left-0 bottom-[1px] translate-y-[100%] w-full h-[140px] bg-cover bg-[url(/images/paper-separator-top.png)] z-10"></div>
    </div>
    
    <!-- groom & bride -->
    <div class="w-full relative bg-black relative bg-cover bg-[url(/images/cover.jpg)]">
      <div class="absolute left-0 top-0 w-full h-full bg-[#272727]/80 flex items-end justify-center"></div>
      <div class="w-full text-center text-white py-[160px] relative px-6">
        <p class="font-body text-sm mb-8">Atas berkah dan kebajikan dari Tian (天) serta restu dari leluhur, dalam sukacita kami mengundang Bapak/Ibu/Saudara/i untuk berkenan menghadiri acara pernikahan kami.</p>
        <div class="groom">
          <h2 class="font-title text-4xl">Deny Ramanda Liu</h2>
          <div class="w-[200px] h-[200px] bg-cover rounded-full mx-auto bg-[url(/images/groom.jpeg)] shadow-lg shadow-[#292929]/50 border border-white my-3"></div>
          <p class="font-body text-sm max-w-[80%] mx-auto">Putra pertama dari Bapak Candra Liu (Fuk Loy) & Ibu Een Suherna (Een)</p>
        </div>
        <p class="text-lg py-4">
          <font-awesome-icon :icon="['fas', 'heart']" />
        </p>
        <div class="groom">
          <h2 class="font-title text-4xl">Sandra Kristianti</h2>
          <div class="w-[200px] h-[200px] bg-cover rounded-full mx-auto bg-[url(/images/bride.jpeg)] shadow-lg shadow-[#292929]/50 border border-white my-3"></div>
          <p class="font-body text-sm max-w-[80%] mx-auto">Putri pertama dari Bapak Susanto Kusuma (Asen) & Ibu Mie Yin (Ayin)</p>
        </div>
      </div>
      <div class="absolute left-0 bottom-[-1px] w-full h-[140px] bg-cover bg-[url(/images/paper-separator-bottom.png)]"></div>
    </div>

    <!-- save the date -->
    <div class="w-full relative bg-[url(/images/paper-background.jpg)] relative">
      <div class="px-6 text-center py-12">
        <h2 class="font-title text-4xl mb-4">Counting Days</h2>
        <p class="text-4xl font-date pb-8">31 Agustus 2025</p>
        <div class="flex items-center justify-center w-full gap-x-4 mb-8">
          <div  class="flex flex-col items-center justify-center gap-y-2">
            <p class="text-4xl font-date w-[60px] h-[60px] bg-red-200 flex items-center justify-center rounded-lg shadow-lg">{{ countdown.days }}</p>
            <p>Hari</p>
          </div>
          <div  class="flex flex-col items-center justify-center gap-y-2">
            <p class="text-4xl font-date w-[60px] h-[60px] bg-red-200 flex items-center justify-center rounded-lg shadow-lg">{{ countdown.hours }}</p>
            <p>Jam</p>
          </div>
          <div  class="flex flex-col items-center justify-center gap-y-2">
            <p class="text-4xl font-date w-[60px] h-[60px] bg-red-200 flex items-center justify-center rounded-lg shadow-lg">{{ countdown.minutes }}</p>
            <p>Menit</p>
          </div>
          <div  class="flex flex-col items-center justify-center gap-y-2">
            <p class="text-4xl font-date w-[60px] h-[60px] bg-red-200 flex items-center justify-center rounded-lg shadow-lg">{{ countdown.seconds }}</p>
            <p>Detik</p>
          </div>
        </div>
        <save-calendar />
      </div>
      <div class="absolute left-0 bottom-[1px] translate-y-[100%] w-full h-[140px] bg-cover bg-[url(/images/paper-separator-top.png)] z-10"></div>
    </div>

    <!-- event -->
    <div class="w-full relative bg-black relative bg-cover bg-[url(/images/cover.jpg)]">
      <div class="absolute left-0 top-0 w-full h-full bg-[#272727]/80 flex items-end justify-center"></div>
      <div class="w-full text-center text-white py-[160px] relative px-6">
        <h2 class="font-title text-6xl mb-4">Lokasi & Acara</h2>
        <p class="font-body text-sm mb-8">Dengan penuh cinta dan kebahagiaan, kami dengan hangat mengundang Anda untuk merayakan hari istimewa kami saat kami memulai perjalanan bersama selamanya. Kehadiran Anda akan membuat momen ini semakin berkesan, dan kami akan merasa terhormat untuk berbagi kebahagiaan ini bersama Anda.</p>
        <div v-for="(ev, idx) in eventDetail" :key="idx" class="border border-white p-6 rounded-lg shadow-lg mb-4">
          <h2 class="font-title text-4xl mb-4">{{ ev.name }}</h2>
          <p class="font-date text-lg mb-2">{{ ev.date }}</p>
          <p class="font-date mb-2">{{ ev.time }}</p>
          <h3 class="font-body text-xl mb-2 font-bold">{{ ev.place }}</h3>
          <p class="font-body text-sm mb-4">{{ ev.address }}</p>
          <div class="font-quote pb-2 drop-shadow px-2 py-1 border border-gray-600 cursor-pointer rounded-lg w-max mx-auto" @click="openGoogleMaps(ev.map)">
            Lihat Lokasi
          </div>
        </div>
      </div>
      <!-- <div class="absolute left-0 bottom-[-1px] w-full h-[140px] bg-cover bg-[url(/images/paper-separator-bottom.png)]"></div> -->
    </div>

    <!-- RSVP -->
    <div class="w-full relative bg-black relative bg-cover bg-[url(/images/cover.jpg)]">
      <div class="absolute left-0 top-0 w-full h-full bg-[#272727]/80 flex items-end justify-center"></div>
      <div class="w-full text-center text-white py-[160px] relative px-6">
        <h2 class="font-title text-6xl mb-4">RSVP</h2>
        <p class="font-body text-sm mb-8">Dengan penuh cinta dan kebahagiaan, kami dengan hangat mengundang Anda untuk merayakan hari istimewa kami saat kami memulai perjalanan bersama selamanya. Kehadiran Anda akan membuat momen ini semakin berkesan, dan kami akan merasa terhormat untuk berbagi kebahagiaan ini bersama Anda.</p>
        <rsvp-form />
      </div>
      <div class="absolute left-0 bottom-[-1px] w-full h-[140px] bg-cover bg-[url(/images/paper-separator-bottom.png)]"></div>
    </div>
    <!-- GIFT -->
    <div class="w-full relative bg-black relative bg-cover bg-[url(/images/cover.jpg)]">
      <div class="absolute left-0 top-0 w-full h-full bg-[#272727]/80 flex items-end justify-center"></div>
      <div class="w-full text-center text-white py-[160px] relative px-6">
        <h2 class="font-title text-6xl mb-4">Hadiah Pernikahan</h2>
        <p class="font-body text-sm mb-8">Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih untuk kami, dapat melalui:</p>
        <div v-for="(rek, idx) in dataRekening" :key="idx" class="w-full mb-4">
          <div class="w-full pb-[45%] border border-stone-500 rounded-xl bg-[url(/icons/bg-card.webp)] bg-cover bg-bottom relative">
            <div class="font-body w-[84%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              <img src="/icons/bca.svg" alt="logo bca" class="w-[100px]">
              <div class="flex text-[#212121] items-center mt-2 gap-x-2">
                <p class="text-2xl font-number leading-none">{{ rek.rekening }}</p>
                <img v-if="succcessCopy !== rek.rekening" src="/icons/copy.svg" alt="icon copy" class="w-[20px] cursor-pointer" @click="copyToClipboard(rek.rekening)">
                <img v-else src="/icons/success-copy.svg" alt="icon copy" class="w-[20px]">
              </div>
              <p class="text-[#212121] mt-2 text-left text-2xl font-number">{{ rek.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute left-0 bottom-[-1px] w-full h-[140px] bg-cover bg-[url(/images/paper-separator-bottom.png)]"></div>
    </div>
    <!-- wish -->
    <div class="w-full relative bg-black relative bg-cover bg-[url(/images/cover.jpg)]">
      <div class="absolute left-0 top-0 w-full h-full bg-[#272727]/80 flex items-end justify-center"></div>
      <div class="w-full text-center text-white py-[160px] relative px-6">
        <h2 class="font-title text-6xl mb-4">Ucapan & Doa</h2>
        <p class="font-body text-sm mb-8">Tulis pesan dan doa terbaikmu untuk kami di sini.</p>
        <wish-form />
      </div>
      <div class="absolute left-0 bottom-[-1px] w-full h-[140px] bg-cover bg-[url(/images/paper-separator-bottom.png)]"></div>
    </div>
    <!-- wish -->
    <div class="w-full relative bg-black relative bg-cover bg-[url(/images/cover.jpg)]">
      <div class="absolute left-0 top-0 w-full h-full bg-[#272727]/80 flex items-end justify-center"></div>
      <div class="w-full text-center text-white py-[160px] relative px-6">
        <h2 class="font-title text-6xl mb-8">Galeri Foto</h2>
        <photo-gallery />
      </div>
      <div class="absolute left-0 bottom-[-1px] w-full h-[140px] bg-cover bg-[url(/images/paper-separator-bottom.png)]"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import RsvpForm from "@/components/organisms/RsvpForm.vue"
import WishForm from "@/components/organisms/WishForm.vue"
import PhotoGallery from "@/components/organisms/PhotoGallery.vue"
import SaveCalendar from "@/components/organisms/SaveCalendar.vue"

let interval;
const cover = ref(null)
const parallax = ref(null)
const succcessCopy = ref("")

const eventDetail = ref([
  {
    name: "Pemberkatan",
    date: "Sabtu, 30 Agustus 2025",
    time: "13.00 - 15.00 WIB",
    place: "MAKIN Pangkalpinang",
    address: "Jl. Denpasar No.231, Pasir Putih, Kota Pangkal Pinang, Kepulauan Bangka Belitung",
    map: "https://www.google.com/maps/place/MAKIN+Pasir+Putih+Pangkalpinang/@-2.1256658,106.1219987,17z/data=!3m1!4b1!4m6!3m5!1s0x2e22c0c56b132bc9:0x65f6f40b4158ae55!8m2!3d-2.1256658!4d106.1245736!16s%2Fg%2F11gh2x_9qp?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D"
  },
  {
    name: "Resepsi",
    date: "Minggu, 31 Agustus 2025",
    time: "17.00 - 20.00 WIB",
    place: "Gedung Setia Bhakti",
    address: "Jl. Denpasar No.231, Pasir Putih, Kota Pangkal Pinang, Kepulauan Bangka Belitung",
    map: "https://www.google.com/maps/place/Gedung+Setia+Bhakti+Pasir+Putih/@-2.1255562,106.1220258,17z/data=!3m1!4b1!4m6!3m5!1s0x2e22c0daa94b5501:0x8238d730aaca9b7d!8m2!3d-2.1255562!4d106.1246007!16s%2Fg%2F11b8r8blpj?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D"
  },
])

const dataRekening = ref([
  {
    name: "DENY",
    rekening: "5271314214"
  },
  {
    name: "SANDRA KRISTIANTI",
    rekening: "4830359295"
  },
])

// Target date: August 31, 2025
const targetDate = new Date("2025-08-31T00:00:00Z").getTime();
const timeLeft = ref(targetDate - Date.now());

const audio = new Audio('audio/dance-with-me.mp3');
const audioIsPlaying = ref(false);

const playAndPauseAudio = () => {
  !audioIsPlaying.value ? audio.play() :  audio.pause();
  audioIsPlaying.value = !audioIsPlaying.value;
};

const openGoogleMaps = (ev) => {
  window.open(ev, "_blank");
}

const handleScroll = () => {
  const jumbotronHeight = cover.value.clientHeight;
  if(window.scrollY < jumbotronHeight) parallax.value.style.transform = "translateY("+ window.scrollY/25 +"%)";

  const viewportMidPoint = (window.scrollY);
  const allText = document.querySelectorAll(".fade-in-transition")
  for(let i=0;i<allText.length;i++) {
    const textTop = allText[i].offsetTop
    textTop < (viewportMidPoint+window.innerHeight/1.5) ?  allText[i].classList.add("show") : allText[i].classList.remove("show")
  }
}

watch(succcessCopy, (newVal, oldVal) => {
  if (newVal) {
    console.log('oldVal', oldVal);
    setTimeout(() => {
      succcessCopy.value = ""
    }, 1200);
  }
});

const copyToClipboard = (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    // Modern approach
    navigator.clipboard.writeText(text).then(() => {
      console.log("Text copied to clipboard!");
      succcessCopy.value = text;
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  } else {
    // Fallback approach for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // Avoid scrolling to the bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      console.log("Text copied to clipboard!");
      succcessCopy.value = text;
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    
    document.body.removeChild(textArea);
  }
}


const updateCountdown = () => {
  timeLeft.value = targetDate - Date.now();
};

const countdown = computed(() => {
  const totalSeconds = Math.floor(timeLeft.value / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
});

// const addToGoogleCalendar = () => {
//   const title = encodeURIComponent("The Wedding of Deny & Sandra");
//   const description = encodeURIComponent("Don't miss our happy day!");
//   const location = encodeURIComponent("Gedung Setia Bhakti Pasir Putih, V4FF+QRH, Jl. Denpasar, Pasir Putih, Kec. Rangkui, Kota Pangkal Pinang, Kepulauan Bangka Belitung 33684, Indonesia");
//   const startDate = "20250831T100000Z"; 
//   const endDate = "20250831T130000Z";
//   const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${description}&location=${location}`;

//   window.open(googleCalendarUrl, "_blank");
// };

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  interval = setInterval(updateCountdown, 1000);
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  clearInterval(interval);
})
</script>

<style lang="scss" scoped>
.custom-animate-spin {
  animation: spin 2s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>