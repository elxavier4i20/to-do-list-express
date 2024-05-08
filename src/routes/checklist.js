const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist');

// Ler todas as coisas do Banco de Dados:
router.get('/', async (req, res) => {
    try {
        let checklist = await Checklist.find({})
        //res.status(200).json(checklist)
        res.status(200).render('checklists/index', { checklist: checklist})
    } catch (error) {
        res.status(200).render('pages/error', {error: 'Erro ao exibir as Listas'})
    }
})

// Criar coisas no Banco de Dados
router.post('/', async (req, res) => {
    let { name } = req.body

    try {
        let checklists = await Checklist.create({ name })
        res.status(200).json(checklists);

    } catch (error) {
       res.status(422).json(error) 
    }
})

// Ler coisas específicas do Banco de Dados:
router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/show', { checklist: checklist});
    } catch (error) {
        res.status(200).render('pages/error', {error: 'Erro ao exibir as Listas de Tarefas'})
    }
})

router.put('/:id', async (req, res) => {
    let { name } = req.body

    try {
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true});
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id);
        res.status(200).json(checklist)
    } catch (error) {
        res.status(422).json(error)
    }
})

module.exports = router;