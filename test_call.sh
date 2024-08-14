#/bin/bash

curl --location 'http://localhost:3000' \
--header 'Content-Type: application/json' \
--data '{
    "jsonrpc": "2.0",
    "method": "eth_getBlockByNumber",
    "params": [
        "latest",
        false
    ],
    "id": 1
}'