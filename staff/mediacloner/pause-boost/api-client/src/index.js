require('dotenv').config()
const axios = require('axios')
const url = require('url')

const apiClient = {
    baseUrl(){
        console.log('this->',this)
        return `http://localhost:5000/api/`//`${this.protocol}://${this.host}:${this.port}/api/`
    }, 
 //  baseUrl: `http://localhost:5000/api/`,
 //baseUrl: `${this.protocol}://${this.host}:${this.port}/api/`,

/* baseUrl: "https://cryptic-bayou-64395.herokuapp.com/api/", */

 /*  
    login(username, password) {
        return this._call('post', 'login', { username, password })
    } */
    
    listPosts() {
        return data(axios.get(url.resolve(this.baseUrl(), 'list')))
    },

    listPostsByUser(id) {
        return data(axios.get(url.resolve(this.baseUrl(), `list/${id}`)))
 
    },

    listFollowingByUser(id) {
        return data(axios.get(url.resolve(this.baseUrl(), `following/${id}`)))
 
    },
    listPostsByGroup(id) {
        return data(axios.get(url.resolve(this.baseUrl(), `listgroup/${id}`))) 
    },
    search(word) {
        return data(axios.get(url.resolve(this.baseUrl(), `search/${word}`)))
    },
  
    addKudo (id) {
        return data(axios.put(url.resolve(this.baseUrl(), `kudos/${id}`)))
    },
    retrievePost (id) {
        return data(axios.get(url.resolve(this.baseUrl(), `post/${id}`)))
    },
    retrieveUser (id) {
        return data(axios.get(url.resolve(this.baseUrl(), `user/${id}`)))
    },



    createComment ( id, userId, comment) {  // id == post
        return data(axios.post(url.resolve(this.baseUrl(), `comment/${id}`), {
            userId, comment
         })) 
    },

    createPost(  title, shortDescription, fullDescription, owner,idPostTemplate,namePostTemplate,tag, URLpath, time) {
        return data(axios.post(url.resolve(this.baseUrl(), 'post'), {  title,shortDescription,fullDescription,owner,idPostTemplate,namePostTemplate,tag, URLpath, time }))
    },

    createUser ( name, surname, email, username, password, city, country, about, timelineTitle ) {
        return data(axios.post(url.resolve(this.baseUrl(), 'user'), { name, surname, email, username, password, city, country, about, timelineTitle  }))
    },

    deleteComment ( id ){
        return data(axios.delete(url.resolve(this.baseUrl(), `comment/${id}`)))
    }

}


function data(resp) {
    return resp.then(res => res.data)
}

module.exports = apiClient