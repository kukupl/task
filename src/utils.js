const request = ({ endpoint, method, data }) => {
    fetch(endpoint, {
        body: JSON.stringify(data),
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const add = data => {
    request({
        endpoint: 'http://localhost:3000/posts',
        method: 'POST',
        data
    });
};

export const update = post => {
    request({
        endpoint: `http://localhost:3000/posts/${post.id}`,
        method: 'PUT',
        data: post
    });
};

export const remove = post => {
    request({
        endpoint: `http://localhost:3000/posts/${post}`,
        method: 'DELETE'
    });
};