<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  asyncData(context) {
    return context.$axios
      .get(process.env.baseUrl + '/posts/' + context.params.postId + '.json')
      .then((res) => {
        return {
          loadedPost: { ...res.data, id: context.params.postId },
        }
      })
      .catch((e) => context.error(e))
  },

  methods: {
    onSubmitted(editedPost) {
      this.$store
        .dispatch('editPost', editedPost)
        .then(() => this.$router.push('/admin/'))
        .catch((e) => console.log('e', e))
      // this.$axios
      //   .put(
      //     'https://my-nuxt-app-dae70-default-rtdb.europe-west1.firebasedatabase.app/posts/' +
      //       this.$route.params.postId +
      //       '.json',
      //     editedPost
      //   )
      //   .then((result) => this.$router.push('/admin/'))
      //   .catch((e) => console.log('e', e))
    },
  },
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>