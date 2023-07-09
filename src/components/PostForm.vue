<template>
    <div class="form">
        <form @submit.prevent>
            <h2 class="header-form">Добавить пост</h2>
            <my-input v-focus v-model="post.title" class="input-form" placeholder="title" />
            <my-input v-model="post.body" class="input-form" placeholder="descr" />
            <my-button @click="createPosts" style="align-self: flex-end">
                submit
            </my-button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        createPosts() {
            this.post.id = Date.now()
            this.$emit('create', this.post)
            this.post = {
                title: '',
                body: ''
            }
        }
    },
}
</script>
<style scoped>
.form {
    margin: 0 auto;
    max-width: 500px;
}

.header-form {
    text-align: center;
    margin-bottom: 15px;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>