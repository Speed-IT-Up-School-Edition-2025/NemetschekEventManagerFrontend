<template>
    <div class = "w-80 h-80 border-yellow rounded-lg border-2 border-solid backdrop-blur-md shadow-lg bg-white/10 transition delay-100 duration-300 ease-in-out hover:shadow-xl/30">
        <h1 class = "text-x1 pt-3 text-yellow text-3xl font-semibold text-center">{{eventName}}</h1>
        <p class = "flex pt-4 pl-2 gap-3 items-center">
            <span><PlaceIcon/></span>
            <span class = "text-grey text-lg">{{place}}</span>
        </p>
        <p class = "flex pt-2 pl-2 gap-3 items-center">
            <span><DateIcon/></span>
            <span class = "text-grey text-lg">{{date}}</span>
        </p>
        <p class = "flex pt-2 pl-2 gap-3 items-center">
            <span><DueDateIcon/></span>
            <span class = "text-grey text-lg">{{registrationDueDate}}</span>
        </p>
        <p class = "flex pt-2 pl-2 gap-3 items-center">
            <span><DescriptionIcon/></span>
            <span class = "text-grey text-lg">{{text}}</span>
        </p>
        <div class = "flex absolute bottom-3 right-2 transition delay-100 duration-75 ease-in-out hover:text-white border-transparent hover:bg-yellow-500 rounded-2xl ">
        <button class="h-10 px-4 border-2 border-yellow-500 rounded-2xl border-solid" @click = "openSignUpPage">Запиши се</button>
        </div>
    </div>
</template>
<script setup lang = "ts">
import DateIcon from './icons/DateIcon.vue';
import DueDateIcon from './icons/DueDateIcon.vue';
import PlaceIcon from './icons/PlaceIcon.vue';
import DescriptionIcon from './icons/DescriptionIcon.vue';
import { useRouter } from 'vue-router';
    const props = defineProps<{
    eventName : string
    place: string
    date: string
    registrationDueDate: Date
    description: string
    page: URL
    }>();
    const router = useRouter();
    const text = props.description ? props.description.slice(0,50) + (props.description.length > 50 ? '...' : '') : '';
    function openSignUpPage(){
        router.push(props.page.toString());
    }
</script>

