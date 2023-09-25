const bcrypt = require('bcrypt');

const validate =  async (password,hash) => {
        
    try {

        const result = await bcrypt.compare(password, hash)

    
        return result;

        


    } catch (error) {
        throw new Error(error); 
    } 
};



module.exports = validate;


