import axios from "axios";

export const postProduct = async (
	title: string,
	description: string,
	genre: string,
	price: number
) => {
	const body = {
		title,
		description,
		price,
        genre
    };

    console.log(body);
	const headers = {
		"Content-Type": "application/json",
	};

	const req = await axios.post("/api/admin/add-item", body, { headers });
    const data = req.data;

    if(!data){
        return "something went wrong";
    }

    console.log(data);
    return data.message;
};
