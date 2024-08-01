<script setup>
  import { onMounted, watch, ref, reactive, provide, computed } from 'vue';
  import axios from 'axios';
  import Header from './components/Header.vue';
  import Card from './components/Card.vue';
  import Cardlist from './components/Cardlist.vue';
  import Drawer from './components/Drawer.vue';
  import InfosBlock from './components/InfosBlock.vue';
  import Home from './pages/Home.vue'

  /*const items = ref([]) */
  const mycart = ref([])
  //const isCreatingOrder = ref(false)


  //  CART START
  const drawerOpen = ref(false);

  const totalPrice = computed(
    () =>  mycart.value.reduce((acc,item) => acc+item.price, 0)
  );
  //const cartIsEmpty = computed(() => mycart.value.length === 0)

  //const cartButtonDisabled = computed(()=>isCreatingOrder.value || cartIsEmpty.value)


  const closeDrawer = () =>{
    drawerOpen.value = false
  }
  const openDrawer = () =>{
    drawerOpen.value = true
  }

  const addToCart = (item) => {
    mycart.value.push(item)
    item.isAdded = true
  }
  const removeFromCart = (item) => {
    mycart.value.splice(mycart.value.indexOf(item), 1)
    item.isAdded = false
  }

  const createOrder = async() => {
    try{
      isCreatingOrder.value = true
      const { data } = await axios.post('https://6e5e12b4bb07b2b5.mokky.dev/orders', {
        items: mycart.value,
        totalPrice: totalPrice.value
      })
      mycart.value = []

      return data;
    } catch(err){
      console.log(err)
    } finally{
      isCreatingOrder.value = false
    }
  }

/*
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
*/
  
 /*
  const onChangeSelect = event => {
    filters.sortBy = event.target.value
  }

  const onSearch = event => {
    filters.searchQuery = event.target.value
  }
*/

  /*const fetchFavs = async() => {
    try {
      const {data: favs} = await axios.get('https://6e5e12b4bb07b2b5.mokky.dev/favs') //sets data to favs
      items.value = items.value.map(item => { 
        const fav = favs.find(fav => fav.parentId === item.id); //for every item, finds if it is fav by checking fav.parentId === item.id
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
  }*/


/* const addToFav = async(item) => {
    try {
      
      if(!item.isFav){
        const obj = {
          parentId: item.id
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
*/

  /*const fetchItems = async()=>{
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
  }*/



  /*onMounted(async() => {
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
*/
  //watch(filters, fetchItems); //if filters change, fetchItems

/* watch(mycart, () =>{
    items.value =  items.value.map((item) => ({
      ...item,
      isAdded:false
    })) //if mycart.value changed (not its contents), then every item from mycart set to be not added
  });
*/
  watch(mycart, () =>{
    localStorage.setItem('mycart', JSON.stringify(mycart.value))
  }, // saves contents of mycart to localstorage (so that when page reloaded, mycart is saved)
  {
    deep: true // deep check of the contents of the mycart
  }
  ) // watch checks if CONTENTS of mycart changed



  provide('mycart', {mycart, closeDrawer,openDrawer, addToCart, removeFromCart})


</script>

<template>
  <div>
    <Drawer :total-price="totalPrice" v-if="drawerOpen"/>
    
    <div class="bg-white w-4/5 m-auto  rounded-xl shadow-xl mt-14">
      <Header :total-price="totalPrice" @open-drawer="openDrawer"><p>HI</p></Header>
      <div class="p-10">
        <RouterView />

        <!-- HOME VUE -->
        <!--
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
        -->

      </div>
    
    </div>
  </div>
  
  
</template>

<style scoped>

</style>
