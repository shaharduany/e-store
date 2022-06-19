const swaggerDocument = {
	openapi: "3.0.1",
	info: {
		version: "1.0.0",
		title: "E-Stpre APIs Document",
		description: "This is the APIs I used to develop my web application",
		termsOfService: "Star my project",
		contact: {
			name: "Shahar Duany",
			email: "shahar.duany@gmail.com"
		},
		license: {
			name: "Apache 2.0",
			url: "https://www.apache.org/licenses/LICENSE-2.0.html",
		},
        paths: {
            "/api/get-products":{
                get: {
                    summary: "Returns an array of products",
                    description: "You can see more about the product schema later",
                    responses: {
                        "201": {
                            description: "A JSON object with the key 'products'",
                        }
                    }
                }
            },
            "/api/add-product": {
                post: {
                    summary: "Post a product on the shop",
                    description: "For admin users, they can post a new product at the shop.",
                    requuestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: Object,
                                    properties: {
                                        prodName: {
                                            type: String,
                                        },
                                        prodDesc: {
                                            type: String,
                                        }, 
                                        prodPrice: {
                                            type: String,
                                        },
                                        image: {
                                            type: "File"
                                        }
                                    }
                                }
                            }
                        },
                        eesponses: {
                            "201": {
                                summary: "Accepted and posted",
                            }
                        }
                    }
                }
            }
        }
	},
};

export default swaggerDocument;