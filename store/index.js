import Vuex from 'vuex'
import Cookies from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          (post) => post.id === editedPost.id
        )
        state.loadedPost[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.$axios
          .get(process.env.baseUrl + '/posts.json')
          .then((res) => {
            const postsArray = []
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key })
            }

            vuexContext.commit('setPosts', postsArray)
          })
          .catch((e) => context.error(e))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      addPost(vuexContext, post) {
        const createdPost = { ...post, updateDate: new Date() }
        return this.$axios
          .post(
            'https://my-nuxt-app-dae70-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=' +
              vuexContext.state.token,
            createdPost
          )
          .then((result) => {
            vuexContext.commit('addPost', {
              ...createdPost,
              id: result.data.name,
            })
          })
          .catch((e) => console.log('e', e))
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .put(
            'https://my-nuxt-app-dae70-default-rtdb.europe-west1.firebasedatabase.app/posts/' +
              editedPost.id +
              '.json?auth=' +
              vuexContext.state.token,
            editedPost
          )
          .then(() => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch((e) => console.log('e', e))
      },
      authenticateUser(vuexContext, authData) {
        let authURL =
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          process.env.fbAPIKey
        if (!authData.isLogin) {
          authURL =
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            process.env.fbAPIKey
        }

        return this.$axios
          .$post(authURL, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((result) => {
            const token = result.idToken
            const tokenExpirationDate =
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000

            vuexContext.commit('setToken', token)
            // localStorage
            localStorage.setItem('token', token)
            localStorage.setItem('tokenExpiration', tokenExpirationDate)
            // cookie
            Cookies.set('jwt', token)
            Cookies.set('expirationDate', tokenExpirationDate)
          })
          .catch((e) => console.log(e))
      },
      initAuth(vuexContext, req) {
        let token = null
        let tokenExpirationDate = null

        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('jwt='))

          if (!jwtCookie) {
            return
          }

          const jwtExpirationDate = req.headers.cookie
            .split(';')
            .find((c) => c.trim().startsWith('expirationDate='))

          token = jwtCookie.split('=')[1]
          tokenExpirationDate = jwtExpirationDate.split('=')[1]
        } else {
          token = localStorage.getItem('token')
          tokenExpirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +tokenExpirationDate || !token) {
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken')
        Cookies.remove('jwt')
        Cookies.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      },
    },
  })
}

export default createStore
