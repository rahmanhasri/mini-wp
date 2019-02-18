Vue.component('search-result', {
  
  props : ['article', 'index'],

  methods : {

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
          <p v-if="article.author">Creator : {{ article.author.name }}</p>
          </footer>
          <a class="btn my-3" style="color: black" @click.prevent="$emit('view-detail', article)">
            View Detail
          </a>
        </div>
      </div>
      </div>
    </div>
  </div>
  `
})