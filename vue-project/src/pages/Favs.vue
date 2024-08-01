<script setup>
    import { onMounted, watch, ref, reactive, provide, computed, inject } from 'vue';
    import axios from 'axios';
    import Cardlist from '../components/Cardlist.vue';

    const favs = ref([])
    



  onMounted(async() => {
    try {
        const {data} = await axios.get("https://6e5e12b4bb07b2b5.mokky.dev/favs?_relations=items");
        favs.value = data.map((obj) => obj.item);
    } catch (error) {
        console.log(error)
    }
  })


</script>

<template>
    <div>
        <div class="flex justify-between items-center"> 
          <h2 class="text-3xl font-bold mb-8">Favorite Sneakers</h2>

          
        </div>
        <div class="mt-10"> 
          <Cardlist :items="favs" @add-to-fav="addToFav" @add-to-cart="onClickAddPlus"/>
        </div>
    </div>
</template>