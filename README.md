# V-store-rest-api
An API used my front-end project of an store [click here to visit it](https://github.com/VitorFigm/React_V_Store)
With this API, we can request information about real amazon's products such as name, price, url to buy those. It allows us to query those by name and apply some filters, like order by price or by ratings

## [Url of the API](https://the-v-store.herokuapp.com/)
# almost 500 real products
all products were taken from the amazon original database
# How to use
## root
If we enter the root URL, it will return the 8 most rated products of those 500. If we sent a form to the root with a "?page=2" parameter in the url, we request the next 8 most rated products and so on.
## filter
We can send a GET request with a form with thoses parameters in url:   
<br>
<pre>filter?product_name=&brand=&maximum_price=&minimum_price=&sort_by=&page&</pre>
### product_name
Used to request products that it name contains a substrig that is equal to product_name
### brand
request products that are only from the selected brand
### maximum_price
request products that the price is lower or equal than the determined parameter
### minimum_price
request products that the price is higher or equal than the determined parameter
