<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 relative overflow-hidden">

    <!-- Floating gradient orbs for background depth -->
    <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl animate-float-slow"></div>
    <div class="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-400/20 blur-2xl animate-float-reverse"></div>

    <!-- Glass Card -->
    <div
      class="relative p-8 rounded-3xl shadow-2xl border border-white/30 
             bg-white/10 backdrop-blur-2xl backdrop-saturate-200
             transition-transform duration-500 hover:scale-105"
      :style="parallaxStyle"
    >
      <!-- Inner glow -->
      <div class="absolute inset-0 rounded-3xl shadow-inner shadow-white/20 pointer-events-none"></div>

      <!-- Animated shimmer -->
      <div class="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div class="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent animate-sweep"></div>
      </div>

      <!-- Pulsing border glow -->
      <div class="absolute inset-0 rounded-3xl border border-white/20 animate-border-glow pointer-events-none"></div>

      <!-- Content -->
      <h1 class="text-3xl font-bold text-white drop-shadow-lg transition-all duration-500 hover:tracking-wider">
        Liquid Glass UI
      </h1>
      <p class="text-white/80 mt-2 drop-shadow">
        Apple-style glass in Vue 3 + Tailwind v4
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const parallaxX = ref(0)
const parallaxY = ref(0)

const handleParallax = (e) => {
  if (e.gamma !== undefined) {
    parallaxX.value = e.gamma / 3
    parallaxY.value = e.beta / 3
  } else {
    parallaxX.value = (e.clientX / window.innerWidth - 0.5) * 10
    parallaxY.value = (e.clientY / window.innerHeight - 0.5) * 10
  }
}

onMounted(() => {
  window.addEventListener('deviceorientation', handleParallax)
  window.addEventListener('mousemove', handleParallax)
})

onUnmounted(() => {
  window.removeEventListener('deviceorientation', handleParallax)
  window.removeEventListener('mousemove', handleParallax)
})

const parallaxStyle = computed(() => ({
  transform: `translate(${parallaxX.value}px, ${parallaxY.value}px)`
}))
</script>

<style scoped>
@keyframes sweep {
  0% { transform: translateX(-100%) rotate(25deg); }
  100% { transform: translateX(200%) rotate(25deg); }
}
.animate-sweep {
  animation: sweep 4s ease-in-out infinite;
}

@keyframes borderGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.2); }
  50% { box-shadow: 0 0 40px rgba(255,255,255,0.4); }
}
.animate-border-glow {
  animation: borderGlow 3s ease-in-out infinite;
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(20px); }
}
.animate-float-slow {
  animation: floatSlow 8s ease-in-out infinite;
}

@keyframes floatReverse {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
.animate-float-reverse {
  animation: floatReverse 10s ease-in-out infinite;
}
</style>
