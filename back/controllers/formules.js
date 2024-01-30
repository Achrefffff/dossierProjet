const DB = require('../db.config')
const Formule = DB.formules
const Cocktail = DB.Cocktail

exports.getAllFormule = (req, res) => {
    Formule.findAll({ include: { model: Cocktail, attributes: ['id', 'nom', 'description', 'recette', 'photo'] } })
        .then(formules => {
            console.log('Formules found:', formules);
            res.json({ data: formules });
        })
        .catch(err => {
            console.error('Database Error:', err);
            res.status(500).json({ message: 'Database Error', error: err });
        });
}

exports.getFormule = async (req, res) => {
    let formuleId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!formuleId) {
        return res.status(400).json({ message: 'Missing Parameter' });
    }

    try {
        // Récupération de l'utilisateur et vérification
        let formule = await Formule.findOne({ where: { id: formuleId }, attributes: ['id','prix','text'] });
        if (formule === null) {
            return res.status(404).json({ message: 'This formule does not exist !' });
        }

        return res.json({ data: formule });
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }
}
exports.createFormule = async (req, res) => {
    const { text, prix, cocktail_id } = req.body;

    if (!text || !prix || !cocktail_id || cocktail_id.length === 0) {
        return res.status(400).json({ message: 'Données manquantes' });
    }
    
    try {
        // Création de la formule
        let formule = await Formule.create({ text, prix });

        // Ajout des cocktails à la formule
        await formule.addCocktails(cocktail_id);

        // Rafraîchir la formule pour obtenir les détails des cocktails associés
        formule = await Formule.findOne({
            where: { id: formule.id },
            include: { model: Cocktail, attributes: ['id', 'nom', 'description', 'recette', 'photo'] }
        });

        return res.json({ message: 'Formule Created', data: formule });
    } catch (err) {
        console.error('Error in createFormule:', err);
        return res.status(500).json({ message: 'Database Error', error: err });
    }
}




exports.updateFormule = async (req, res) => {
    let formuleId = parseInt(req.params.id);
    if (!formuleId) {
        return res.status(400).json({ message: 'Missing Parameter' });
    }

    try {
        // Récupération de l'utilisateur et vérification
        let formule = await Formule.findOne({ where: { id: formuleId }, attributes: ['id','text', 'prix'] });
        if (formule === null) {
            return res.status(404).json({ message: 'This formule does not exist !' });
        }

        // Mise à jour de l'utilisateur
        formule.update(req.body, { where: { id: formuleId }, attributes: ['id','text', 'prix' ] })
            .then(formule => res.json({ message: 'Formule Updated', data: formule }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }
}
exports.deleteFormule = async (req, res) => {
    let formuleId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!formuleId) {
        return res.status(400).json({ message: 'Missing Parameter' });
    }

    try {

        let formule = await Formule.findOne({ where: { id: formuleId }, attributes: ['id', 'text', 'prix'] });
        if (formule === null) {
            return res.status(404).json({ message: 'This formule does not exist !' });
        }

        formule.destroy({ where: { id: formuleId } })
            .then(formule => res.json({ message: 'Formule Deleted', data: formule }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }
}

