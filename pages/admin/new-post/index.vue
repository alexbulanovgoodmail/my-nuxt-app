<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
export default {
  middleware: ['check-auth', 'auth'],
  layout: 'admin',
  methods: {
    onSubmitted(postData) {
      this.$store
        .dispatch('addPost', postData)
        .then(() => this.$router.push('/admin/'))
        .catch((e) => console.log('e', e))
      // this.$axios
      //   .post(
      //     'https://my-nuxt-app-dae70-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      //     { ...postData, updateDate: new Date() }
      //   )
      //   .then((result) => this.$router.push('/admin/'))
      //   .catch((e) => console.log('e', e))
    },
  },
}
</script>
<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>