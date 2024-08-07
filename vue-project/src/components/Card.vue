<script setup>
  defineProps({
    id: Number,
    imageUrl: String,
    title: String,
    price: Number,
    isFav: Boolean,
    isAdded: Boolean,
    onClickAdd: Function,
    onClickFav: Function
  })


</script>




<template>
    <div class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition"> 
      <img 
      @click="onClickFav" 
      :src=" isFav ? '../like-2.svg' : '../like-1.svg'" 
      alt="Like 1" 
      class="absolute top-8 left-8"/>
      
      <img :src="imageUrl" alt="Sneaker">

      <p class="mt-2">{{title}}</p>

      <div class="flex justify-between mt-5"> 
        <div class="flex flex-col">
          <span class="text-slate-400">Price:</span>
          <b>{{price}} rub.</b>
        </div>

        <img 
        @click="onClickAdd" 
        :src=" isAdded ? '../checked.svg' : '../plus.svg' " 
        alt="Plus">
      </div>
    </div>
</template>