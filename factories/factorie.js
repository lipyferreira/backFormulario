import Repositore from "./../repositores/repositore.js";
import Service from "./../services/service.js";

import db from './../connection/connection.js'

const generateInstace = () =>{
    const repositore = new Repositore(
        db
    )
    const service = new Service(
        {repositore}
    )

    return service
}
export default {generateInstace}

// const data = {
//     id: 1704950478558,
//     nome: 'Syrlon Mendes',
//     faixa: 'roxa',
//     nascimento: '1888-10-18',
//     telefone: '(85)99999-9977',
// }

// generateInstace().update(data).then(console.log())
// generateInstace().create(data)