Vue.component('register-component', {


  data() {
    return {
      name : '',
      email : '',
      password : '',
    }
  },

  methods : {
    register() {

      axios({
        method : 'post',
        url: serverUrl + '/register',
        data : { name : this.name, email : this.email, password : this.password }
      })
      .then( ({ data })=> {
        localStorage.setItem('token', data.token )
        localStorage.setItem('email', data.email)
        this.clearRegister()
        this.$emit('registered')
      })
      .catch( ({ response }) => {
        let warning = response.data.message || response.statusText
        swal(warning, {
          timer : 2000,
          button : false 
        })
      })
    },

    clearRegister() {
      this.name = ''
      this.email = ''
      this.password = ''
    }
  },
  
  template : `
    <div class="wrapper">
      <form class="form-signin my-3" @submit.prevent="register">       
        <h2 class="form-signin-heading my-2">Register</h2>
        <input type="text" class="form-control my-2" name="name" placeholder="Your blessed name" required="" v-model="name"/>
        <input type="text" class="form-control my-2" name="username" placeholder="Email Address" required="" v-model="email"/>
        <input type="password" class="form-control my-2" name="password" placeholder="Password" required="" v-model="password"/>      
        <button class="btn btn-lg btn-primary btn-block my-2" type="submit">Register</button>   
      </form>
    </div>
  `
})