<template>
    <h1>Страница с постами</h1>
    <my-input v-focus style="margin: 15px 0; width: 100%;" :model-value="searchQuery" @update:model-value="setSearchQuery"
        placeholder="Поиск..." />
    <div class="app-buttons">
        <my-button @click="showDialog">
            Создать пост
        </my-button>
        <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOption" />
    </div>
    <my-dialog v-model:show="dialogVisible">
        <post-form @create="createPost" />
    </my-dialog>
    <post-lists v-if="!isLoading" @remove="removePost" :posts="sortedAndSearchedPosts" />
    <p v-else>
        Загрузка...
    </p>
    <div v-intersection="loadMorePosts" class="observe">

    </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostLists from '@/components/PostLists'
import { mapMutations } from 'vuex'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    components: {
        PostForm, PostLists
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        createPost(post) {
            this.posts.push(post)
            this.dialogVisible = false
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogVisible = true
        },
    },
    mounted() {
        this.fetchPosts()
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isLoading: state => state.post.isLoading,
            selectedSort: state => state.post.selectedSort,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPage: state => state.post.totalPage,
            searchQuery: state => state.post.searchQuery,
            sortOption: state => state.post.sortOption,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    }
}
</script>

<style>
.app-buttons {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
    justify-content: center;
}

.page {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid teal;
    padding: 10px;
    cursor: pointer;
    margin: 0 5px;
    width: 100%;
    max-width: 30px;
}

.current-page {
    border: 1px solid black
}
</style>