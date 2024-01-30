const DB = require('../db.config');
const Cocktail = DB.Cocktail;
const User = DB.User;
const path = require('path');
exports.getAllCocktails = async (req, res) => {
    try {
        const cocktails = await Cocktail.findAll({
            include: { model: User, attributes: ['id', 'email', 'pseudo'] },
        });

        return res.json({ data: cocktails });
    } catch (err) {
        console.error('Error in getAllCocktails:', err);
        return res.status(500).json({ message: 'Database Error', error: err });
    }
};
exports.getCocktail = async (req, res) => {
    let cocktailId = parseInt(req.params.id);
    try {
        // Récup du cocktail
        let cocktail = await Cocktail.findOne({
            where: { id: cocktailId },
            include: { model: User, attributes: ['id', 'pseudo', 'email'] },
        });

        // Test si résultat
        if (cocktail === null) {
            return res.status(404).json({ message: 'This cocktail does not exist !' });
        }
        // Renvoi du Cocktail trouvé
        return res.json({ data: cocktail });
    } catch (err) {
        console.error('Error in getCocktail:', err);
        return res.status(500).json({ message: 'Database Error', error: err });
    }
};

exports.addCocktail = async (req, res) => {
    const { user_id, nom, description, recette } = req.body;
    const file = req.file;
     // Vérifiez la présence des données et de la photo
    if (!user_id || !nom || !description || !recette || !file) {
      return res.status(400).json({ message: 'Données manquantes  ' });
    }
      try {
      // Vérifiez que le fichier n'est pas trop volumineux
      if (file.size > 1000000) {
        return res.status(400).json({ message: 'Fichier trop volumineux' });
      }
        // Obtenez le chemin du fichier image
      const photoPath = path.join(__dirname, 'uploads', file.filename);
        // Traitement  chemin du fichier et création le cocktail
      const cocktail = await Cocktail.create({
        user_id,
        nom,
        description,
        recette,
        photo: photoPath,
      });
        // Enregistrez le cocktail dans la base de données
      await cocktail.save();
        // Retournez une réponse avec un message de succès et les données du cocktail nouvellement créé
      return res.json({ message: 'Cocktail créé', data: cocktail });
    } catch (err) {
      console.error('Erreur dans addCocktail:', err);
      return res.status(500).json({ message: 'Erreur interne du serveur', error: err });
    }
  };

exports.updateCocktail = async (req, res) => {
    let cocktailId = parseInt(req.params.id);
    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }
    try {
        // Recherche du cocktail et vérification
        let cocktail = await Cocktail.findOne({ where: { id: cocktailId }, raw: true });
        if (cocktail === null) {
            return res.status(404).json({ message: 'This cocktail does not exist !' });
        }

        // Mise à jour du cocktail
        await Cocktail.update(req.body, { where: { id: cocktailId } });
        return res.json({ message: 'Cocktail Updated' });
    } catch (err) {
        console.error('Error in updateCocktail:', err);
        return res.status(500).json({ message: 'Database Error', error: err });
    }
};


exports.untrashCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    Cocktail.restore({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
};

exports.trashCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    // Suppression du cocktail
    Cocktail.destroy({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
};

exports.deleteCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id);

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    // Suppression du cocktail
    Cocktail.destroy({ where: { id: cocktailId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
};
