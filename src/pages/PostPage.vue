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
        <post-form @create="createPost" />
    </my-dialog>
    <post-lists v-if="!isLoading" @remove="removePost" :posts="sortedAndSearchedPosts" />
    <p v-else>
        Загрузка...
    </p>
    <div v-intersection="loadMorePosts" class="observe">

    </div>
    <!-- <nav class="page__wrapper">
        <button v-for="pageNumber in totalPage" :key="pageNumber" class="page" :class="{
            'current-page': pageNumber === page
        }" @click="changePage(pageNumber)">
            {{ pageNumber }}
        </button>
    </nav> -->
</template>

<script>
import PostForm from '@/components/PostForm'
import PostLists from '@/components/PostLists'
import axios from 'axios'
export default {
    components: {
        PostForm, PostLists
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isLoading: false,
            selectedSort: '',
            page: 1,
            limit: 10,
            totalPage: 0,
            searchQuery: '',
            sortOption: [
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По содержимому' },
            ],
        }
    },
    methods: {
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
        // changePage(pageNum) {
        //     this.page = pageNum
        // },
        async fetchPosts() {
            try {
                this.isLoading = true
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    })
                    this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = response.data
                    this.isLoading = false
                }, 1000)
            } catch (error) {
                alert('Error')
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1;
                setTimeout(async () => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                        params: {
                            _page: this.page,
                            _limit: this.limit
                        }
                    })
                    this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
                    this.posts = [...this.posts, ...response.data]
                    this.isLoading = false
                }, 1000)
            } catch (error) {
                alert('Error')
            }
        }
    },
    mounted() {
        this.fetchPosts()
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        // page() {
        //     this.fetchPosts()
        // }
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