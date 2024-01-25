class Aluno {
    constructor({ nome, telefone, faixa, nascimento }) {
        this.id = Math.floor(Math.random() * 100) + Date.now()
        this.nome = nome 
        this.telefone = telefone
        this.faixa = faixa
        this.nascimento = nascimento
    }

    isValid(){
        const propertyNames = Object.getOwnPropertyNames(this)
        const amountInvalid = propertyNames
            .map((property) => (!!this[property]) ? null : ` ${property} is missing!`)
            .filter(item => !!item)
        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        }
    }
}
export default Aluno
// const data = {
//     nome:'felipe',telefone:'xxxx-xxxx', faixa:'roxa', nascimento:'01/01/0101'
// }
// const valid = new Aluno(data)
// console.log(valid.isValid());