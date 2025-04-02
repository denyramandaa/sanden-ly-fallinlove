<template>
  <div class="w-full bg-gray-700">
    <div class="w-full max-w-[480px] mx-auto ">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@mixin large-desktop {
  @media (min-width: 1440px) { 
    @content; 
  }
}
.container-content {
  @include large-desktop {
    max-width: 1062px;
  }
}
</style>
