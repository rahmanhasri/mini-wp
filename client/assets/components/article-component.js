Vue.component('article-component', {
  
  props : ['article', 'index', 'user-article'],

  methods : {
    deleteArticle(id, index) {
      // console.log(id, index)
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this article!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios({
            method: 'delete',
            url: serverUrl + `/articles/${id}`,
            headers : { token : localStorage.getItem('token') }
          })
            .then( response => {
              // console.log(response)
              // let index = this.articles.findIndex(article => {
              //   return article._id == id
              // })
              this.$emit('delete-article', { index : index, id : id })
              swal("Poof! Your Article has been deleted completely!", {
                icon: "success",
              });
            })
            .catch( ({ response }) => {

              let warning = response.data.message || response.statusText
              swal(warning, {
                timer: 2000,
              })
              // console.log(JSON.stringify(err))
            })
        }
      });
    },

    updateArticle(article) {
      this.$emit('edit-article', article)
    },

    archiveThis(id, index, value) {
      swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios({
            method: 'put',
            url: serverUrl + `/articles/${id}`,
            headers : { token : localStorage.getItem('token') },
            data : { status : value }
          })
            .then( response => {
              if(value === 'published') {
                this.restoreArticle({ index : index, id : id })
              } else {
                this.archiveArticle({ index : index, id : id })
              }
            })
            .catch( ({ response }) => {

              let warning = response.data.message || response.statusText
              swal(warning, {
                timer: 2000,
              })
              // console.log(JSON.stringify(err))
            })
        }
      });
    },
    archiveArticle(obj) {
      this.$emit('archive-article', obj)
      swal("Your Article has been removed and goes to trash!", {
        icon: "success",
      });
    },
    restoreArticle(obj) {
      this.$emit('restore-article', obj)
      swal("Your Article has been restored!", {
        icon: "success"
      })
    },
    getDate(date) {

      let month = {
        0: 'January',
        1: 'February',  
        2: 'March', 
        3 : 'April',
        4 : 'May',
        5 : 'June',
        6 : 'July',
        7 : 'August',
        8 : 'September',
        9 : 'October',
        10 : 'November',
        11 : 'December'
      }

      return `${new Date(date).getDate()} ${month[new Date(date).getMonth()]} ${new Date(date).getFullYear()}`

    }
  },
  template : `
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-3">
          <img class="img-thumbnail" :src="article.image" alt="article-image" v-if="article.image != ''">
        </div>
        <div class="col-md-9">
          <h4 class="card-title">{{ article.title }}</h4>
          <footer><p>Created At : {{ getDate(article.created_at) }}</p>
          <div v-if="!userArticle">
          <p v-if="article.author">Creator : {{ article.author.name }}</p>
          </div>
          </footer>
          <a class="btn my-3" style="color: black" @click.prevent="$emit('view-detail', article)">
            View Detail
          </a>
          <template v-if="userArticle == 'user'">
            <a class="btn btn-outline-success rounded-0 my-3" @click="updateArticle(article)">
              Edit
            </a>
          </template>
          <template v-if="userArticle == 'user'">
            <a class="btn btn-outline-danger rounded-0 my-3" href="#" @click="archiveThis(article._id, index, 'archived')" role="button" >
              Delete
            </a>
          </template>
          <template v-if="userArticle == 'trash'">
            <a class="btn btn-outline-success rounded-0 my-3" href="#" @click="archiveThis(article._id, index, 'published')" role="button" >
              Restore
            </a>
          </template>
          <template v-if="userArticle == 'trash'">
            <a class="btn btn-outline-danger rounded-0 my-3" href="#" @click="deleteArticle(article._id, index)" role="button" >
              Really Really Delete
            </a>
          </template>
        </div>
      </div>
      </div>
    </div>
  </div>
  `
})