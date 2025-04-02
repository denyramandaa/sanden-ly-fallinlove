<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const name = ref("");
const message = ref("");
const successMessage = ref("");
const allMessages = ref(null);

const submitMessage = async () => {
  try {
    await addDoc(collection(db, "wish"), {
      name: name.value,
      message: message.value,
      timestamp: new Date(),
    });

    successMessage.value = "Pesan Anda sudah terkirim!";
    name.value = "";
    message.value = "";
  } catch (error) {
    console.error("Error submitting Wish Message:", error);
  }
};

const fetchMessages = () => {
  try {
    const messagesRef = collection(db, "wish");
    const q = query(messagesRef, orderBy("timestamp", "desc")); // Order messages by timestamp

    onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });

      allMessages.value = messages;
      console.log("Live messages:", allMessages.value);
    });
  } catch (error) {
    console.error("Error setting up live updates:", error);
  }
};

// const convertedDate = (firestoreDate) => {
//   if (!(firestoreDate instanceof Timestamp)) return null;

//   const date = firestoreDate.toDate();

//   // Format date (e.g., 15 Maret 2025)
//   const formattedDate = new Intl.DateTimeFormat('id-ID', { 
//     day: 'numeric', month: 'long', year: 'numeric'
//   }).format(date);

//   // Format time (e.g., 14.40)
//   const formattedTime = new Intl.DateTimeFormat('id-ID', { 
//     hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' 
//   }).format(date);

//   // Combine date and time with the desired format
//   return `${formattedDate} • ${formattedTime} WIB`;
// }

onMounted(() => {
  fetchMessages();
})
</script>

<template>
  <div class="text-[#333]">
    <form class="max-w-sm mx-auto" @submit.prevent="submitMessage">
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium font-body text-white text-left">Nama</label>
        <input v-model="name" required id="name" class="bg-transparent border border-white text-sm rounded-lg focus:ring-blue-500 outline-0 block w-full p-2.5  font-body text-white" />
      </div>
      <div class="mb-5">
        <label for="message" class="block mb-2 text-sm font-medium font-body text-white text-left">Pesan</label>
        <textarea v-model.number="message" id="message" class="bg-transparent border border-white text-sm rounded-lg focus:ring-blue-500 outline-0 block w-full p-2.5 font-body text-white" required rows="5" cols="3"></textarea>
      </div>
      <button type="submit" class="text-white bg-stone-500 font-body font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
    </form>
    <p class="text-[#a1a1a1] mt-4 font-body" v-if="successMessage">{{ successMessage }}</p>
  </div>
  <div class="mt-8 max-w-sm mx-auto p-4 border border-[#78716c] rounded-lg bg-black/20">
    <div class="max-h-[320px] overflow-y-auto pr-4">
      <div v-for="(msg, idx) in allMessages" :key="idx" class="bg-white shadow rounded-lg w-full py-1.5 px-2.5 text-[#333] font-body w-max max-w-full text-left mb-4 w-full">
        <p class="text-sm mb-1 leading-none text-[#78716c] font-bold">{{ msg.name }}</p>
        <p class="text-sm mb-1">{{ msg.message }}</p>
        <!-- <p class="text-xs">{{ convertedDate(msg.timestamp) }}</p> -->
      </div>
    </div>
  </div>
</template>
