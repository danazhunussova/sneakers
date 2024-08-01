<script setup>
    import { onMounted, watch, ref, reactive, provide, computed, inject } from 'vue';
    import axios from 'axios';
    import Card from '../components/Card.vue';
    import Cardlist from '../components/Cardlist.vue';
    



    const items = ref([])
    const {mycart, addToCart, removeFromCart} = inject('mycart')
    
    const onChangeSelect = event => {
        filters.sortBy = event.target.value
    }

    const onSearch = event => {
        filters.searchQuery = event.target.value
    }

    const onClickAddPlus = async(item) =>{
    try {
      
      if(!item.isAdded){
        addToCart(item);
      } else {
        removeFromCart(item);
      }

    } catch(err) {
      console.log(err)
    }
  }



    const addToFav = async(item) => {
        try {
        
        if(!item.isFav){
            const obj = {
            itemId: item.id,
            item
            }; 
            const {data: favs} = await axios.post('https://6e5e12b4bb07b2b5.mokky.dev/favs', obj);
            item.isFav = true
            item.favId = data.id;
            console.log(data)
        } else {
            await axios.delete('https://6e5e12b4bb07b2b5.mokky.dev/favs/'+item.favId)
            item.isFav = false
            item.favId = null
        }

        } catch(err) {
        console.log(err)
        }
    }


    const filters = reactive({
        sortBy: '',
        searchQuery: ''
    })



    const fetchFavs = async() => {
    try {
      const {data: favs} = await axios.get('https://6e5e12b4bb07b2b5.mokky.dev/favs') //sets data to favs
      items.value = items.value.map(item => { 
        const fav = favs.find(fav => fav.itemId === item.id); //for every item, finds if it is fav by checking fav.itemId === item.id
        if(!fav){ 
          return item; 
        } 
        return { //if it is fav
          ...item, //for all
          isFav: true, //sets item.isFav = true
          favId:fav.id, //and give it its fav id
        }
      });
      } 
      catch(err){console.log(err)}
  }

  const fetchItems = async()=>{
    try {

      const params = {
        sortBy: filters.sortBy,
        searchQuery: filters.searchQuery
      } //two params for filters
      const {data} = await axios.get('https://6e5e12b4bb07b2b5.mokky.dev/items?sortBy=' + filters.sortBy + '&title=*' + filters.searchQuery + "*")
      items.value = data.map(obj => ({
        ...obj,
        isFav: false,
        isAdded: false,
        favId: null,
        cartIteId: null
      }));
    }  // gets data from mokky, and then maps data to items[]. sets every item correctly
    catch(err){console.log(err)}
  }

  onMounted(async() => {
    const localcart = localStorage.getItem('mycart') //if localcart exists mycart == localcart
    mycart.value = localcart ? JSON.parse(localcart) : [];


    await fetchItems(); 
    await fetchFavs();
    //await fetchCart();


    items.value = items.value.map((item) => ({ //fetch first, then add everything from mycart to items
      ...item,
      isAdded: mycart.value.some((cartIte) => cartIte.id === item.id) 
    }))
  })

  watch(mycart, () =>{
    items.value =  items.value.map((item) => ({
      ...item,
      isAdded:false
    })) //if mycart.value changed (not its contents), then every item from mycart set to be not added
  }); 


    watch(filters, fetchItems); //if filters change, fetchItems




</script>
<template>
    <div>
        <div class="flex justify-between items-center"> 
          <h2 class="text-3xl font-bold mb-8">All Sneakers</h2>

          <div class="flex gap-4">
            <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none" name="" id="">
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
            </select>

            <div class="relative">
            <img class="absolute left-5 top-2.5" src="/search.svg" alt="Search">
            <input @change="onSearch" class="border rounded-md py-1.5 pl-11 pr-4 outline-none focus:border-gray-400"
            placeholder="Поиск"
            type="text">
            </div>
          </div>
        </div>
        <div class="mt-10"> 
          <Cardlist :items="items" @add-to-fav="addToFav" @add-to-cart="onClickAddPlus"/>
        </div>
    </div>
</template>