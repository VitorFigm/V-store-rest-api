const fs = require('fs')
///database
const Sequelize = require('sequelize')
const data_base = new Sequelize(
    process.env.DB_NAME||'amazon_products',
    process.env.DB_USERNAME||'root',
    process.env.DB_PASSWORD||'1234',
    {
    host:process.env.DB_HOST||'localhost',
    dialect:'mysql',
    logging: false,
})

async function db_query(query,inputs){
    try{
        let query_result = await data_base.query(query , { replacements:inputs } )
        return query_result[0]
    }catch(err){
        throw new Error(err)
    }
}

////brands
const brands = {};
get_brand_list()
function get_brand_list(req,res){
    brands.list = JSON.parse(fs.readFileSync("brand_list.json"))
}

module.exports = {
    'database_query':db_query,
    'brands':brands,
}