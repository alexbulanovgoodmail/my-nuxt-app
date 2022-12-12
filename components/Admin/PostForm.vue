<template>
  <form @submit.prevent="onSubmit">
    <UIAppControlInput v-model="editedPost.author"
      >Author Name</UIAppControlInput
    >
    <UIAppControlInput v-model="editedPost.title">Title</UIAppControlInput>
    <UIAppControlInput v-model="editedPost.thumbnail"
      >Thumbnail Link</UIAppControlInput
    >
    <UIAppControlInput v-model="editedPost.content" control-type="textarea"
      >Content</UIAppControlInput
    >
    <UIAppControlInput v-model="editedPost.previewText" control-type="textarea"
      >Preview Text</UIAppControlInput
    >
    <UIAppButton type="submit">Save</UIAppButton>
    <UIAppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
      >Cancel</UIAppButton
    >
  </form>
</template>


<script>
export default {
  props: {
    post: {
      type: Object,
      required: false,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            author: '',
            title: '',
            thumbnail: '',
            content: '',
            previewText: '',
          },
    }
  },

  methods: {
    onCancel() {
      this.$router.push('/admin/')
    },
    onSubmit() {
      this.$emit('submit', this.editedPost)
    },
  },
}
</script>