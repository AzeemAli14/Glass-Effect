```vue
<template>
  <div
    class="relative min-h-screen bg-cover bg-center dark:bg-gray-900"
    style="
      background-image: url('https://source.unsplash.com/random/1920x1080');
    "
  >
    <nav :class="['glass-nav', { 'glass-nav--shrunk': isScrolled }]">
      <button
        class="glass-button"
        @click="toggleDarkMode"
        @mousedown="handleButtonClick"
      >
        Toggle {{ isDark ? "Light" : "Dark" }} Mode
      </button>
      <button
        class="glass-button"
        @click="reduceTransparency = !reduceTransparency"
        @mousedown="handleButtonClick"
      >
        {{ reduceTransparency ? "Enable" : "Disable" }} Transparency
      </button>
    </nav>
    <div class="absolute inset-0 top-[84px] max-w-xl mx-auto">
      <div
      :class="[
        'relative rounded-2xl p-6 m-4 shadow-lg border',
        'bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(17,24,39,0.1)] backdrop-blur-[12px] border-[rgba(255,255,255,0.2)]',
        'glass-card',
        { 'no-blur': reduceTransparency, pulse: isCardClicked },
      ]"
      @mousemove="handleMouseMove"
      @click="handleCardClick"
      :style="cardStyle"
    >
      <h1 class="text-2xl font-bold text-white dark:text-gray-200">
        Liquid Glass UI
      </h1>
      <p class="text-gray-200 dark:text-gray-300">
        Vue 3 with Tailwind CSS v4.
      </p>
      <svg>
        <defs>
          <filter id="wave">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="1"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                values="0.01;0.02;0.01"
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);
const isDark = ref(false);
const reduceTransparency = ref(false);
const isCardClicked = ref(false);
const cardStyle = ref({});
const ripple = ref({ display: "none", top: "0px", left: "0px" });

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
};

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  cardStyle.value = {
    transform: `perspective(1000px) rotateX(${y * 10}deg) rotateY(${
      x * 10
    }deg) scale(${isCardClicked.value ? 0.98 : 1})`,
  };
};

const handleCardClick = () => {
  isCardClicked.value = true;
  setTimeout(() => {
    isCardClicked.value = false;
  }, 300); // Pulse duration
};

const handleButtonClick = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ripple.value = {
    display: "block",
    top: `${y}px`,
    left: `${x}px`,
  };
  setTimeout(() => {
    ripple.value = { display: "none", top: "0px", left: "0px" };
  }, 800); // Extended ripple duration for fluid effect
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.glass-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  /* For dark mode */
  /* Use .dark .glass-nav selector for dark mode if needed */
  backdrop-filter: blur(12px);
  padding: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.dark .glass-nav {
  background: rgba(17, 24, 39, 0.1);
}
.glass-nav--shrunk {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  animation: flow 1s ease-in-out;
}
.dark .glass-nav--shrunk {
  background: rgba(17, 24, 39, 0.2);
}
.glass-button {
  position: relative;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  overflow: hidden;
}
.dark .glass-button {
  background: rgba(17, 24, 39, 0.2);
  color: #e5e7eb;
}
.glass-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05) rotate(1deg);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.4),
    inset 0 0 10px rgba(255, 255, 255, 0.2);
  animation: glow 1.5s ease-in-out infinite;
}
.dark .glass-button:hover {
  background: rgba(17, 24, 39, 0.3);
}
.glass-button::after {
  content: "";
  position: absolute;
  .glass-card {
    /* Replace @apply with equivalent Tailwind classes in template */
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.05)
    );
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out,
      filter 0.3s ease-out;
    position: relative;
    overflow: hidden;
  }
  animation: liquid-ripple 0.8s ease-out;
}
.glass-card {
  /* Tailwind utility classes are now in the template, not here */
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.05)
  );
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out,
    filter 0.3s ease-out;
  position: relative;
  overflow: hidden;
}
.glass-card:hover {
  transform: scale(1.02);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3),
    0 6px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3);
  filter: url(#wave);
  animation: glow 1.5s ease-in-out infinite;
}
.glass-card.pulse {
  transform: scale(0.98);
  animation: pulse 0.3s ease-out;
}
.glass-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.3;
  animation: shimmer 3s linear infinite;
}
.no-blur {
  background-color: rgba(255, 255, 255, 0.8);
  /* For dark mode, override with a selector */
  backdrop-filter: none;
}
.dark .no-blur {
  background-color: rgba(17, 24, 39, 0.8);
}
@keyframes flow {
  0% {
    transform: scaleY(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}
@keyframes glow {
  0%,
  100% {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3),
      inset 0 0 10px rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.5),
      inset 0 0 15px rgba(255, 255, 255, 0.3);
  }
}
@keyframes liquid-ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 0.6;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    width: 250px;
    height: 250px;
    opacity: 0;
  }
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.98);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
@supports (filter: url(#wave)) {
  svg {
    position: absolute;
    width: 0;
    height: 0;
  }
}
</style>
