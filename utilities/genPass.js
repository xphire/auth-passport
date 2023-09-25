const bcrypt = require('bcrypt');

const hash =  async (password) => {
        
    try {

        const result = await bcrypt.hash(password, 10);



        return result;

        


    } catch (error) {
         throw new Error(error); 
    } 
};



module.exports = hash;



