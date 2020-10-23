const { database_query, brands } = require("./queries")
const products_per_page = 8

async function count_query_s_pages_number(where = "",replacements) {
    const query = `SELECT COUNT(*) FROM product ${where}`
    let products_number = await database_query(query,replacements)
    products_number = products_number[0]["COUNT(*)"]
    return parseInt(products_number / products_per_page) + 1
}

function query_brand_list(req, res) {
    res.json(brands)
}

async function query_home_page(req, res) { 
    try{
        const { page = 1 } = req.query;
        const offset = products_per_page * (page - 1)
        let query =
            `SELECT * FROM product
         ORDER BY rating DESC
         LIMIT ${products_per_page}
         OFFSET ${offset}`
        const products = await database_query(query)
        const pages_number = await count_query_s_pages_number()
        res.json({ 'products': products, 'pages_number': pages_number })
    }catch(err){
        throw new Error(err)
    }
}

async function query_with_filters(req, res) {
    const { product_name,
        brand, maximum_price,
        minimum_price, sort_by, page=1}
        = req.query
    let replacements = []
    try{
        const where_clause = get_where_clause()
        const order_by = get_order_by()
        const offset = products_per_page * (page - 1)
        const query = `SELECT * FROM product ${where_clause} ${order_by} 
        LIMIT ${products_per_page}
        OFFSET ${offset}`
        const products = await database_query(query,replacements)
        const pages_number = await count_query_s_pages_number(where_clause,replacements)
        res.json({ 'products': products, 'pages_number': pages_number })
    }catch(err){
        throw new Error(err)
    }

    function get_where_clause() {
        let where_clause = [
            write_condition_if(is_valid(product_name), {to_write:'title LIKE ?',input:`%${product_name}%`}),
            write_condition_if(is_valid(brand) || brand !== "all", {to_write:'brand =?',input:brand}),
            write_condition_if(is_valid(minimum_price), {to_write:'price>=?',input:minimum_price}),
            write_condition_if(is_valid(maximum_price), {to_write:'price<=?',input:maximum_price})
        ]
        where_clause = where_clause.filter((value) => value != "")
        return "WHERE "+where_clause.join(' and ')

        function write_condition_if(condition,args){
            const {to_write,input} = args
            if(condition){ 
                replacements.push(input)
                return to_write
            }else{
                return ""
            }
        }

        function is_valid(value) {
            return value != undefined && value != ""
        }
    }

    function get_order_by() {
        const order_by =
                sort_by == "lower prices" ? "ORDER BY price DESC":
                sort_by == "higher prices" ? "ORDER BY price ASC":
               "ORDER BY rating DESC"
        return order_by
    }
}


module.exports = {
    'home_page': query_home_page,
    'brands': query_brand_list,
    'filter': query_with_filters,
}