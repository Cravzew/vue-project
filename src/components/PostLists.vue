<template>
    <ul style="overflow: hidden;" v-if="posts.length > 0">
        <h2 class="header-post-list">Список комментарьев</h2>
        <transition-group name="posts-list">
            <post-item v-for="post in posts" @remove="this.$emit('remove', post)" :key="post.id" :post="post" />
        </transition-group>
    </ul>
    <h2 v-else style="color: red">
        Список пустой
    </h2>
</template>
<script>
import PostItem from './PostItem'
export default {
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>
<style scoped>
.header-post-list {
    margin-top: 15px;
}

.posts-list-item {
    display: inline-block;
    margin-right: 10px;
}

.posts-list-enter-active,
.posts-list-leave-active {
    transition: all .3s ease;
}

.posts-list-enter-from,
.posts-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}

.posts-list-move {
    transition: transform .3s ease;
}
</style>
