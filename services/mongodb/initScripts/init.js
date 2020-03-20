var dbo = connect('127.0.0.1:27017/shortURL')
dbo.createCollection( "url_store", {
    validationLevel: "strict",
    validationAction: "error",
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["shortUrl","originalURL","usage_count","max_usage"],
            properties: {
                shortUrl: {
                    bsonType: "string",
                    description: "Must be string and is required"
                },
                originalURL: {
                    bsonType : "string",
                    description: "Must be string and is required"
                },
                usage_count: {
                    bsonType: "int",
                    description: "Must be integer and is required"
                },
                max_usage: {
                    bsonType: "int",
                    description: "Must be integer and is required"
                }
             }
        }
    }
});
