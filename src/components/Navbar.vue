<template>
    <nav class="nav">
        <my-button @click="$router.push('/')">
            главная
        </my-button>
        <my-button @click="$router.push('/page')">
            posts
        </my-button>
        <my-button @click="$router.push('/store')">
            store
        </my-button>
        <my-button @click="$router.push('/about')">
            обо мне
        </my-button>
    </nav>
</template>
<style scoped>
.nav {
    display: flex;
    justify-content: space-evenly;
    height: 50px;
    background-color: rgb(0, 53, 53);
    padding: 10px;
}
</style>