# Kalvium_backend_SRMIST_RA2011003010561

The server that responds to mathematical operations sent via URL

NOTE : YOU CAN FIND THE REQUIRED SERVER CODE IN THE BACKEND FOLDER WITH NAME server.js
        Kalvium_backend_SRMIST_RA2011003010561 / backend / server.js


I developed a server capable of processing mathematical operations transmitted via URL. 
It has the added functionality of preserving a history of the last 20 operations executed on the server.
Operating on localhost:3000, the server can handle an array of mathematical operations, demonstrated through endpoints such as /5/plus/3, 
which would yield a JSON response like {question: "5+3", answer: 8}. 
The system supports the chaining of multiple operations in the URL, allowing for complex calculations. 
Moreover, the server maintains the /history endpoint, listing the last 20 calculations, persisting even after the server restarts.

Example :
URL -->http://localhost:3000/3/into/5/plus/8/minus/6
Response --> {question: "3*5+8-6", answer: 17}


For History of Operations -->

URL -->http://localhost:3000/history
Response --> An HTML page listing the last 20 operations performed on the server and their results.


Main Endpoint -->

URL -->http://localhost:3000/
Response -->An HTML page listing all available demo endpoints for mathematical operations.

