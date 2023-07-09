<template>
    <navbar></navbar>
    <router-view></router-view>
</template>
<script>
import Navbar from '@/components/Navbar'
export default {
    components: {
        Navbar
    }
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
}

body {
    padding: 15px;
}
</style>