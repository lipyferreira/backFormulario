import http from 'http'
const PORT = process.env.PORT || 3000
const DEFAULT_HEADER = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://65b5a8f6213eeefc4d80ced8--regal-gumption-f8b0f4.netlify.app',
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
    'Access-Control-Allow-Methods': '*'
}
import Fatory from './factories/factorie.js'
const Service = Fatory.generateInstace()
import Aluno from './entities/aluno.js'
import { jsPDF } from "jspdf";
import 'jspdf-autotable'

const routes = {
    '/aluno:get': async (request, response) => {
        const { id } = request.queryString
        
        if (!id) {
            const allAlunos = await Service._findAll()
        }
        const aluno = await Service.find(id)
        response.write(JSON.stringify({ results: aluno }))
        response.end()
    },


    '/all:get': async (request, response) => {

        const aluno = await Service._findAll()

        let alunosString = ''
        let count = 0
        for (const key in aluno) {
            const { nome, faixa, telefone, nascimento } = aluno[key]
            alunosString = alunosString + '\n\n' + JSON.stringify(`${count + 1} - ID: ${key} - ` + nome) + '\n' +
                JSON.stringify('Faixa: ' + faixa + ' - Contato: ' + telefone + ' Data de nascimento: ' + nascimento)

            count++
        }

        gererPDF(alunosString)

        response.write(JSON.stringify({ results: 'api privada' }))
        response.end()

    },

    '/aluno:post': async (request, response) => {
        //async interator
        for await (const data of request) {
            try {
                // await Promise.reject('/aluno:post')
                const item = JSON.parse(data)
                const aluno = new Aluno(item)
                const { error, valid } = aluno.isValid()
                if (!valid) {
                    response.writeHead(400, DEFAULT_HEADER)
                    response.write(JSON.stringify({ error: error.join(',') }))
                    return response.end()
                }

                const id = await Service.create(aluno)
                response.writeHead(201, DEFAULT_HEADER)
                response.write(JSON.stringify({ seccess: 'Aluno created with success!!', id }))

                return response.end();
            } catch (error) {
                return handlerError(response)(error)
            }
        }
    },

    '/aluno:patch': async (request, response) => {
        for await (const data of request) {
            try {
                // await Promise.reject('/aluno:post')
                let item = JSON.parse(data.toString())

                const aluno = new Aluno(item)

                const { error, valid } = aluno.isValid()
                if (!valid) {
                    response.writeHead(400, DEFAULT_HEADER)
                    response.write(JSON.stringify({ error: error.join(',') }))
                    return response.end()
                }
                const dadosAluno = {
                    nome: aluno.nome,
                    telefone: aluno.telefone,
                    faixa: aluno.faixa,
                    nascimento: aluno.nascimento
                }
                item = {
                    id: item.id,
                    ...dadosAluno
                }
                
                await Service.update(item)
                
                response.writeHead(201, DEFAULT_HEADER)
                response.write(JSON.stringify({ success: 'Aluno atualizado com sucesso! ' }))
                return response.end()

            } catch (error) {
                return handlerError(response)(error)
            }
        }

    },

    default: (request, response) => {
        response.write('Helo')
        response.end()
    }
}


const gererPDF = (alunosString) =>{
        const doc = new jsPDF()
        doc.text(alunosString, 10, 10)
        doc.save('alunos.pdf')
}

const handlerError = response => {
    return error => {
        console.error('Deu ruim', error)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({ error: 'Internal Server Error!!' }))

        response.end()
    }
}

const handler = (request, response) => {
    const { url, method } = request

    console.log(url);
    const [first, route, id] = url.split('/')

    request.queryString = { id: isNaN(id) ? id : Number(id) }
    
    const key = `/${route}:${method.toLowerCase()}`
    
    response.writeHead(200, DEFAULT_HEADER)
  
    const chosen = routes[key] || routes.default

    return chosen(request, response) ? chosen(request, response) : handlerError(response)

}
http.createServer(handler)
    .listen(PORT, () => console.log('servidor rodando ', PORT))