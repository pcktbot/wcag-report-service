<template>
  <div class="copyright-container px-3 py-2">
    <p class="text-primary d-flex align-item-center">
      <span class="mr-2 font-weight-bold">
        ©
      </span>
      <b-img-lazy
        src="/g5-primary-logo.png"
        width="25px"
        alt="G5 Logo"
        class="mr-1"
      />
      {{ new Date().getFullYear() }}
    </p>
  </div>
</template>

<style>
.copyright-container {
  position: fixed;
  opacity: 0.3;
  bottom: 0;
  right: 0;
  transition: 200ms ease-in-out;
}
.copyright-container:hover {
  opacity: 1;
}
</style>
