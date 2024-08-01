<script setup>
    import {ref} from 'vue'
    let count = ref(0);
    function increment(){
        count.value++
    }
    /*function updateCount(event){
        count.value = Number(event.target.value)
    }*/
    defineProps({
        title:String,
        price:Number,
        isAdded: Boolean
    })
</script>


<template>
    <div class="product">
        <h1>Товар: {{title}}</h1>
        <h2>Price: {{price}}</h2>
        <h2>Количество: {{  count  }}</h2>
        <button @click="increment">+</button>
        <input v-model="count">
        <h3>Добавлен: {{ isAdded }}</h3>
        <!--<input @input="updateCount">-->

        <slot></slot>
    </div>

</template>

<style scoped>
    .product{
        border: 1px solid blue;
        padding: 10px;
        margin-bottom:10px;

    }
    .product button{
            padding:5px;
        }
</style>