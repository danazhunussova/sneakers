<script setup>
defineProps({
    imageUrl: String,
    title: String,
    description:String
})
</script>

<template>
    <div class="flex flex-col mx-auto w-72 items-center text-center">
        <img height="70" width="70" :src="imageUrl" alt="Info Img">
        <h2 class="mt-4 text-2xl font-bold">{{ title }}</h2>
        <p class="text-center text-gray-500 mt-2" style="text-align: center;">{{ description }}</p>
    </div>
</template>
