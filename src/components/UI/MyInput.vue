<template>
    <input :value="modelValue" @input="updateInput" type="text" class="input-form">
</template>
<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>
<style scoped>
.input-form {
    margin-bottom: 15px;
    padding: 15px;
    background-color: transparent;
    border: 1px solid teal;
    outline: none;
}
</style>