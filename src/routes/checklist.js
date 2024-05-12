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

router.get('/new', async(req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist });
    } catch (error) {
        res.status(500).render('pages/error', { errors: 'Erro ao carregar formulário.' })
    }
})

router.get('/:id/edit', async(req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/edit', { checklist: checklist})
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir a edição de Listas de tarefas.'});
    }
})

// Criar coisas no Banco de Dados
router.post('/', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({name})

    try {
        await checklist.save();
        res.redirect('/checklists');

    } catch (error) {
        res.status(422).render('checklists/new', { checklists: { ...checklist, error}})
    }
})

// Ler coisas específicas do Banco de Dados:
router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklists/show', { checklist: checklist});
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir as Listas de Tarefas'})
    }
})

router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist;
    //let checklist = await Checklist.findById(req.params.id);

    try {
        await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true});
        res.redirect('/checklists');
    } catch (error) {
        let errors = error.errors;
        res.status(422).render('checklists/edit', {checklist: {...checklist, errors}});
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