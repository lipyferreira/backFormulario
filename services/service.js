// import Repositore from "../repositores/repositore.js"
// import db from "../connection/connection.js"
class Service {
    constructor({repositore}){
        this.repositore = repositore
    }
    
    async _findAll(){
        return this.repositore._currentfileCurrent()
    }

    async find(itemId){
        return this.repositore.find(itemId)
    }

    async create(data){
        return this.repositore.create(data)
    }

    async update(data){
        return this.repositore.update(data)
    }
}

export default Service
