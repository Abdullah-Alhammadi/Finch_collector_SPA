export default async function sendRequest(url, method = 'GET', payload) {
    const token = localStorage.getItem("token"); 
    const options = { method };

    if (payload) {
        options.headers = {
            'Content-Type': 'application/json'
        };
        options.body = JSON.stringify(payload);
    }

    if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const res = await fetch(`http://localhost:8000${url}`, options);
        if (res.ok) {
            return await res.json();
        } else {
            const errorData = await res.text();
            throw new Error(`Request failed: ${res.status} ${res.statusText} - ${errorData}`);
        }
    } catch (err) {
        console.error("Error in send-request:", err.message);
        return null;
    }
}
