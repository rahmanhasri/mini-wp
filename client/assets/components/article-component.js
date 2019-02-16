Vue.component('article-component', {
  
  props : ['article', 'index1'],
  methods : {
    deleteArticle(id, index) {
      console.log(id, index)
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
            url: serverUrl + `/articles/${id}`
          })
            .then( response => {
              // console.log(response)
              // let index = this.articles.findIndex(article => {
              //   return article._id == id
              // })
              this.$emit('deleteArticle', index)
              swal("Poof! Your Article has been deleted!", {
                icon: "success",
              });
            })
            .catch( err => {
              console.log(JSON.stringify(err))
            })
        }
      });
    },

    updateArticle(article) {
      this.$emit('edit-article', article)
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
          <footer><p>Created At : {{ getDate(article.created_at) }}</p></footer>
          <a class="btn my-3" style="color: black" >
            View Detail
          </a>
          <a class="btn btn-outline-success rounded-0 my-3" href="#collapseOne" data-toggle="collapse" @click="updateArticle(article)">
            Edit
          </a>
          <a class="btn btn-outline-danger rounded-0 my-3" href="#" @click="deleteArticle(article._id, index)" role="button" >
            Delete
          </a>
        </div>
      </div>

      <div class="row">

        <div class="collapse w-100" :id="article._id">
          <div class="card card-body" v-html="article.content">
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})