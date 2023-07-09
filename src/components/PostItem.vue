<template>
    <li class="post">
        <div>
            <p>{{ post.id }}</p>
            <p>
                <strong> Имя: </strong>
                {{ post.title }}
            </p>
            <p>
                <strong> Комментарий: </strong>
                {{ post.body }}
            </p>
        </div>
        <div class="btn-group">
            <my-button style="margin-bottom: 10px;" @click="this.$emit('remove', post)">
                Удалить
            </my-button>
            <my-button @click="$router.push('/page/' + post.id)">
                открыть
            </my-button>
        </div>
    </li>
</template>
<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
}
</script>
<style scoped>
.btn-group {
    display: flex;
    flex-direction: column;
}

.post {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border: 1px solid teal;
    margin-top: 15px;
    align-items: center;
}
</style>