const characterPopulate = {
    path: 'characters',
    model: 'Character',
    populate: [
        { 
            path: 'class',
            model: 'Class',
        },
        { 
            path: 'spells',
            model: 'Spell',
        }
    ]
}

module.exports = characterPopulate;