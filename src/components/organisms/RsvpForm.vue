<script setup>
import { ref } from "vue";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

const name = ref("");
const attendees = ref(1);
const confirmation = ref("yes");
const successMessage = ref("");

const submitRSVP = async () => {
  try {
    await addDoc(collection(db, "rsvps"), {
      name: name.value,
      attendees: attendees.value,
      confirmation: confirmation.value,
      timestamp: new Date(),
    });

    successMessage.value = "RSVP submitted successfully!";
    name.value = "";
    attendees.value = 1;
    confirmation.value = "yes";
  } catch (error) {
    console.error("Error submitting RSVP:", error);
  }
};
</script>

<template>
  <div class="text-[#333]">
    <form class="max-w-sm mx-auto" @submit.prevent="submitRSVP">
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium font-body text-white text-left">Nama</label>
        <input v-model="name" required id="name" class="bg-transparent border border-white text-sm rounded-lg focus:ring-blue-500 outline-0 block w-full p-2.5  font-body text-white" />
      </div>
      <div class="mb-5">
        <label for="attendees" class="block mb-2 text-sm font-medium font-body text-white text-left">Jumlah Tamu</label>
        <input v-model.number="attendees" type="number" min="1" id="attendees" class="bg-transparent border border-white text-sm rounded-lg focus:ring-blue-500 outline-0 block w-full p-2.5 font-body text-white" required />
      </div>
      <fieldset>
        <label for="confirmation" class="block mb-2 text-sm font-medium font-body text-white">Konfirmasi Kehadiran</label>
        <div class="flex gap-x-4 items-center justify-center">
          <div class="flex items-center mb-4 gap-x-2 font-body">
            <input type="radio" name="confirmation" value="yes" class="w-4 h-4 border-gray-300" v-model="confirmation" checked>
            <label class="block ms-2  text-base font-medium text-gray-900 dark:text-gray-300">
              Hadir
            </label>
          </div>
          <div class="flex items-center mb-4 gap-x-2 font-body">
            <input type="radio" name="confirmation" value="no" v-model="confirmation" class="w-4 h-4 border-gray-300">
            <label class="block ms-2 text-base font-medium text-gray-900 dark:text-gray-300">
              Tidak Hadir
            </label>
          </div>
        </div>
      </fieldset>
      <button type="submit" class="text-white bg-stone-500 font-body font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
    </form>
    <p class="text-[#a1a1a1] mt-4 font-body" v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>
