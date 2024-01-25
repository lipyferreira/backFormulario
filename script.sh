echo '\n\n id não informado'
curl localhost:3000/aluno

echo '\n\n requesting with wrong body'
curl --silent -X POST \
    --data-binary '{"invalid": "data"}' \
    localhost:3000/aluno

echo '\n\n create anderson'
CREATE=$(curl --silent -X POST \
    --data-binary '{"nome": "Lêlê", "telefone": "(85)99999-9999", "faixa": "amerela/preto", "nascimento": "01/10/1999"}' \
    localhost:3000/aluno)

echo $CREATE

ID=$(echo $CREATE | jq .id)

echo '\n\n requesting Lêlê'
curl localhost:3000/aluno/$ID
