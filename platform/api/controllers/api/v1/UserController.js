module.exports = {
    
    information(req, res) {
        var { discord_id } = req.params;
        
        var query = {
            where: {
                discord_api: discord_id
            },
            attributes: [
                'username',
                'display_name',
                'user_id',
                'score'
            ]
        };
        
        return db.users
            .findOne(query)
            .then(user => {
                if(!user){
                    return res.status(404).send();
                }

                return res.send(user);
            });
    },

    _config: {}

};
