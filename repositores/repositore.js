import { ref, set, get, child, update, remove } from 'firebase/database'

class Repositore {
    constructor({ db }) {
        this.db = db,
            this.routes = 'aluno/'
    }

    async _currentfileCurrent() {
        const dbref = ref(this.db);

        const results = await get(child(dbref, `${this.routes}`)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val()
            }
        }).catch((error) => {
            console.log("error " + error)
        })

        return results;
    }

    async create({ nome, faixa, nascimento, telefone, id }) {
        await set(ref(this.db, `${this.routes}` + id), {
            nome: nome,
            faixa: faixa,
            nascimento: nascimento,
            telefone: telefone
        }).then(() => {
            console.log('Created with success!')

        }).catch((error) => {
            console.log("erro " + error)
        })
        return id;
    }

    async find(itemId) {
        const data = await this._currentfileCurrent()
            .then((res) => {
                if (res[itemId] !== undefined)
                    return res[itemId]
                throw new Error('Houve um erro')
            })
            .catch((error) => console.log(error))

        return data
    }

    async update(data) {

        let currentData = await this.find(data.id)

        currentData = {
            ...data
        }
        delete currentData.id
        const updatedData = currentData

        update(ref(this.db, this.routes + data.id), {
            ...updatedData
        })
            .then(() => {

                console.log('Dados atualizados com sucesso')
            })
            .catch((error) => console.log('error ' + error))
        
        return;
    }

}

export default Repositore