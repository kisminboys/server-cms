import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    teachers: [],
    teacher: {}
  },
  mutations: {
    toggleSidebarDesktop (state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile (state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
      state[variable] = value
    },
    SET_TEACHERS (state, payload) {
      state.teachers = payload
    },
    SET_TEACHER (state, payload) {
      state.teacher = payload
    }
  },
  actions: {
    login (context, payload) {
      console.log(payload);
      axios({
        method: 'POST',
        url: '/admin/login',
        data: payload
      })
        .then(response => {
          console.log(response.data)
          localStorage.setItem('access_token', response.data.access_token)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchTeachers (context, payload) {
      axios({
        method: 'get',
        url: '/teachers',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
        context.commit('SET_TEACHERS', data)
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
    },
    fetchTeacherById (context, payload) {
      console.log(payload);
      axios({
        method: 'get',
        url: `/teachers/${payload}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      .then(({ data }) => {
        console.log(data);
        context.commit('SET_TEACHER', data)
      })
      .catch(err => {
        console.log(err);
      })
    } 
  },
  modules: {
  }
})
