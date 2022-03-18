import { createContext } from 'react'

const PostContext = createContext({});
const PostProvider = PostContext.Provider;

export { PostContext, PostProvider };