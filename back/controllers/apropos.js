const DB = require('../db.config')
const About = DB.apropos


exports.getAllAbout = (req, res) => {
    About.findAll()
        .then(about => res.json({ data: about }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getAbout = async (req, res) => {
    let aboutId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!aboutId) {
        return res.status(400).json({ message: 'Missing Parameter' });
    }

    try {
        // Récupération de l'utilisateur et vérification
        let about = await About.findOne({ where: { id: aboutId }, attributes: ['id', 'title', 'content'] });
        if (about === null) {
            return res.status(404).json({ message: 'This about does not exist !' });
        }

        return res.json({ data: about });
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }
}

exports.createAbout = (req, res) => {
    // Vérification des champs
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: 'Missing parameters' });
    }

    // Création de l'utilisateur
    About.create(req.body)
        .then(about => res.status(201).json({ data: about }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}
exports.updateAbout = async (req, res) => {
    let aboutId = parseInt(req.params.id);
    if (!aboutId) {
        return res.status(400).json({ message: 'Missing Parameter' });
    }

    try {
        // Récupération de l'utilisateur et vérification
        let about = await About.findOne({ where: { id: aboutId }, attributes: ['id', 'title', 'content'] });
        if (about === null) {
            return res.status(404).json({ message: 'This about does not exist !' });
        }

        // Mise à jour de l'utilisateur
        about.update(req.body, { where: { id: aboutId } })
            .then(about => res.json({ message: 'About Updated', data: about }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }
}
exports.deleteAbout = async (req, res) => {
    let aboutId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!aboutId) {
        return res.status(400).json({ message: 'Missing Parameter' });
    }

    try {
        // Récupération de l'utilisateur et vérification
        let about = await About.findOne({ where: { id: aboutId }, attributes: ['id', 'title', 'content'] });
        if (about === null) {
            return res.status(404).json({ message: 'This about does not exist !' });
        }

        
        about.destroy({ where: { id: aboutId }, force: true })
            .then(() => res.status(204).json({}))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }
}