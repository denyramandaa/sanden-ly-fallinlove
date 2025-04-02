<template>
    <div class="font-quote text-[24px] pb-2 drop-shadow px-4 py-2 border border-gray-600 cursor-pointer rounded-lg w-max mx-auto" @click="addEventToGoogleCalendar()">
        Save the Date
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { gapi } from 'gapi-script';

const CLIENT_ID = "224155061529-o1rmbjaiput9629h3oq9inqii1j3b40a.apps.googleusercontent.com";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

onMounted(() => {
  gapi.load("client:auth2", initClient);
});

const initClient = async () => {
  await gapi.client.init({
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  });
};

const addEventToGoogleCalendar = async () => {
  const authInstance = gapi.auth2.getAuthInstance();
  if (!authInstance.isSignedIn.get()) {
    await authInstance.signIn();
  }

  const event = {
    summary: "The Wedding of Deny & Sandra",
    location: "Gedung Setia Bhakti Pasir Putih, Indonesia",
    description: "Don't miss our happy day!",
    start: {
      dateTime: "2025-08-31T10:00:00+07:00",
      timeZone: "Asia/Jakarta",
    },
    end: {
      dateTime: "2025-08-31T13:00:00+07:00",
      timeZone: "Asia/Jakarta",
    },
  };

  const response = await gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  if (response.status === 200) {
    alert("Event added to Google Calendar!");
  } else {
    alert("Failed to add event. Please try again.");
  }
};
</script>