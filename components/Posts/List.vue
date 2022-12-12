<template>
  <section class="post-list">
    <PostsPreview
      v-for="post in posts"
      :id="post.id"
      :key="post.id"
      :is-admin="isAdmin"
      :title="post.title"
      :preview-text="post.previewText"
      :thumbnail="post.thumbnail"
    />
  </section>
</template>

<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
      required: false,
      default() {
        return false
      },
    },
    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>