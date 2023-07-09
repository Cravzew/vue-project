<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'my-button'
}
</script>
<style scoped>
.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    background-color: transparent;
    color: teal;
    border: 1px solid teal;
    cursor: pointer;
}
</style>