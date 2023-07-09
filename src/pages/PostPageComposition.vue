<template>
    <h1>Страница с постами</h1>
    <my-input v-focus style="margin: 15px 0; width: 100%;" v-model="searchQuery" placeholder="Поиск..." />
    <div class="app-buttons">
        <my-button @click="showDialog">
            Создать пост
        </my-button>
        <my-select v-model="selectedSort" :options="sortOption" />
    </div>
    <my-dialog v-model:show="dialogVisible">
        <post-form />
    </my-dialog>
    <post-lists v-if="!isLoading" :posts="sortedAndSearchedPosts" />
    <p v-else>
        Загрузка...
    </p>
    <div v-intersection="loadMorePosts" class="observe">

    </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostLists from '@/components/PostLists'
import usePosts from '@/hooks/usePosts'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSortedAndSearchPosts from '@/hooks/useSortedAndSearchPosts'
export default {
    components: {
        PostForm, PostLists
    },
    data() {
        return {
            dialogVisible: false,
            sortOption: [
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По содержимому' },
            ],
        }
    },
    methods: {
    },
    setup(props) {
        const { posts, totalPage, isLoading } = usePosts(10)
        const { selectedSort, sortedPosts } = useSortedPosts(posts)
        const { searchQuery, sortedAndSearchPosts } = useSortedAndSearchPosts(sortedPosts)

        return {
            posts, totalPage, isLoading, selectedSort, sortedPosts, searchQuery, sortedAndSearchPosts,
        }
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