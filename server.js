// import { createServer} from 'node:http'

// const server = createServer((req, res) => {
//     console.log('Rodando o server !!!')
    
//     return res.end()
// })

// server.listen(4000)

import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify()

const database = new DatabaseMemory()



server.get('/videos', (req,res) =>{
    //Esse parametro não é obrigatório
    const search = req.query.search

    const videos = database.list(search)

    return videos
})

server.post('/videos', (req, res)=>{
    const conteudo = req.body
    

    database.create({
        title:conteudo.title,
        description: conteudo.description,
        duration: conteudo.duration,
    })


    console.log(database.list())

    return res.status(201).send()
})
server.put('/videos/:id', (req,res)=>{
    const  videoId = req.params.id
    const conteudo = req.body

    const video = database.update(videoId, {
        title : conteudo.title,
        description : conteudo.description,
        duration : conteudo.duration
    })

    return res.status(204).send()
})

server.delete('/videos/:id', (req,res)=>{
    const videoId = req.params.id

    database.delete(videoId)

    return res.status(204).send()
})

server.listen({
    port: 3333,
})