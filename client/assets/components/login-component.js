Vue.component('login-component', {


  data() {
    return {
      email : '',
      password : ''
    }
  },

  methods : {
    login() {

      axios({
        method : 'post',
        url: serverUrl + '/login',
        data : { email : this.email, password : this.password }
      })
      .then( ({ data })=> {
        // console.log(data)
        // console.log(data)
        localStorage.setItem('token', data.token )
        localStorage.setItem('email', data.email)
        this.$emit('logged')
      })
      .catch( ({ response }) => {
        let warning = response.data.message || 'invalid username or password'
        // console.log(response.data.message)
        swal(warning, {
          timer : 2000,
          button : false 
        })
      })
    },

    clearLogin() {
      this.email = ''
      this.password = ''
    }
  },
  
  template : `
    <div class="wrapper">
      <form class="form-signin my-3" @submit.prevent="login">       
        <h2 class="form-signin-heading my-2">Please login</h2>
        <input type="text" class="form-control my-2" name="username" placeholder="Email Address" required="" v-model="email"/>
        <input type="password" class="form-control my-2" name="password" placeholder="Password" required="" v-model="password"/>      
        <label class="mx-auto">
          <a href="#" @click.prevent="$emit('register')">First time here ? </a>
        </label>
        <button class="btn btn-lg btn-primary btn-block my-2" type="submit">Login</button>   
        <div><h5 style="text-align: center;"> OR </h5></div>
        <fucking-google></fucking-google>
      </form>
    </div>
  `
})